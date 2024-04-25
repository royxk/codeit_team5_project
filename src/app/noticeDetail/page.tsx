"use client";
import React, { useState, useEffect } from "react";
import StoreDetail from "@/components/common/StoreDetail";
import { STORE_DETAIL_POST } from "@/util/constants/STORE_DETAIL_POST";
import {
  searchNoticeApiResponse,
  searchShopInformationApiResponse,
} from "@/util/api";
import Post from "@/components/common/Post/Post";
import PostSkeleton from "@/components/common/Post/PostSkeleton";
import ApiResponse from "@/components/common/Post/PostListType";
import { formatApiDateData } from "@/util/formatDate";
import { saveRecentPostsLocalStorage } from "@/util/recentPostsLocalStorageLogic";
import { removeRecentPostsLocalStorage } from "@/util/recentPostsLocalStorageLogic";
import S from "@/util/constants/TEST_POST_VALUES";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ApiResponse[]>([]);

  useEffect(() => {
    // handleSearchNoticeClick();
    handleGetRecentPosts();
  }, []);

  // 기존 공고 불러오기 (최근x)
  const handleSearchNoticeClick = async () => {
    setLoading(true);
    try {
      const response = await searchNoticeApiResponse();
      setItems(response.items); // Update state with fetched data
      console.log(response.items); // Optional chaining to avoid accessing undefined data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 최근 조회한 공고 불러오기
  const handleGetRecentPosts = () => {
    // removeRecentPostsLocalStorage(); //최근 데이터 삭제
    const recentPosts = localStorage.getItem("recentPosts");
    if (recentPosts) {
      setItems(JSON.parse(recentPosts));
      console.log(JSON.parse(recentPosts));
    }
  };

  // 특정 공고 조회
  const getSpecificNotice = async (shopId: string) => {
    setLoading(true);
    try {
      const response = await searchShopInformationApiResponse(shopId);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveOnLocalStorage = (data: ApiResponse) => {
    // Save the data to local storage
    if (data) {
      saveRecentPostsLocalStorage(data);
    }
    const recentPosts = localStorage.getItem("recentPosts");
    console.log(JSON.parse(recentPosts as string));
  };

  return (
    <div className={`flex w-full flex-col items-center justify-center gap-10`}>
      <StoreDetail data={STORE_DETAIL_POST} />
      <div className={`flex flex-col gap-5`}>
        <div className={`text-[28px] font-bold`}>최근에 본 공고</div>
        {/* <div
          onClick={() =>
            getSpecificNotice("da8c6ed3-c73e-4057-a039-804e8eb71d7a")
          }
        >
          조회
        </div> */}
        <div className={`w-fit bg-red-10`}>공고 하나 만들기</div>
        <div
          className={`mb-[100px] flex w-[968px] flex-row flex-wrap gap-4 tab:w-full`}
        >
          {items.length === 0 && (
            <div className={`w-full content-center text-[20px]`}>
              최근에 본 공고가 없습니다.
            </div>
          )}
          {loading
            ? Array.from({ length: 5 }, (_, index) => (
                <PostSkeleton key={index} />
              ))
            : items.map((data) => (
                <div
                  key={data.item.id}
                  onClick={() => saveOnLocalStorage(data)}
                >
                  <Post
                    key={data.item.id}
                    imgUrl={data.item.shop.item.imageUrl}
                    shopName={data.item.shop.item.name}
                    address1={data.item.shop.item.address1}
                    hourlyPay={data.item.hourlyPay}
                    startTime={
                      formatApiDateData(
                        data.item.startsAt,
                        data.item.workhour,
                      )[0]
                    }
                    startHour={
                      formatApiDateData(
                        data.item.startsAt,
                        data.item.workhour,
                      )[1]
                    }
                    state={!data.item.closed}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

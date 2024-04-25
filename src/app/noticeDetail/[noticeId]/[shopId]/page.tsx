"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import StoreDetail from "@/components/common/StoreDetail";
import { initialStoreDetailPost } from "@/util/constants/STORE_DETAIL_POST";
import Post from "@/components/common/Post/Post";
import PostSkeleton from "@/components/common/Post/PostSkeleton";
import { formatApiDateData } from "@/util/formatDate";
import ApiResponse from "@/components/common/Post/PostListType";
import StoreDetailProps from "@/components/common/StoreDetail/StoreDetailTypes";
import { saveRecentPostsLocalStorage } from "@/util/recentPostsLocalStorageLogic";
import { searchSelectedNoticeApiResponse } from "@/util/api";
import { get } from "http";

const StoreDetailPage = () => {
  const router = useParams<{ shopId: string; noticeId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setIem] = useState<StoreDetailProps>(initialStoreDetailPost);
  const [items, setItems] = useState<ApiResponse[]>([]);

  useEffect(() => {
    // handleSearchNoticeClick();
    getSelectedNotice(router.shopId, router.noticeId);
    // handleGetRecentPosts();
  }, []);

  const getSelectedNotice = async (shopId: string, noticeId: string) => {
    setLoading(true);
    try {
      const response = await searchSelectedNoticeApiResponse(shopId, noticeId);
      setIem(response);
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
      <StoreDetail data={item} />
      <div className={`flex flex-col gap-5`}>
        <div className={`text-[28px] font-bold`}>최근에 본 공고</div>
        <div onClick={() => getSelectedNotice(router.shopId, router.noticeId)}>
          조회
        </div>
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

export default StoreDetailPage;

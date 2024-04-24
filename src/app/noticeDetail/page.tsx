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

const Page = () => {
  useEffect(() => {
    handleSearchNoticeClick();
  }, []);

  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ApiResponse[]>([]);

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
        <div
          className={`mb-[100px] flex w-[968px] flex-row flex-wrap gap-4 tab:w-full`}
        >
          {loading
            ? Array.from({ length: 5 }, (_, index) => (
                <PostSkeleton key={index} />
              ))
            : items.map((data) => (
                <Post
                  key={data.item.id}
                  imgUrl={data.item.shop.item.imageUrl}
                  shopName={data.item.shop.item.name}
                  address1={data.item.shop.item.address1}
                  hourlyPay={data.item.hourlyPay}
                  startTime={data.item.startsAt}
                  startHour={data.item.workhour.toString()}
                  state={!data.item.closed}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

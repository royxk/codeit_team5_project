"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NoticeDetail from "@/components/common/NoticeDetail";
import Post from "@/components/common/Post/Post";
import PostSkeleton from "@/components/common/Post/PostSkeleton";
import { formatApiDateData } from "@/util/formatDate";
import { NoticeItem } from "@/components/common/Post/PostListType";
import { StoreDetailPostType } from "@/components/common/NoticeDetail/NoticeDetailTypes";
import { saveRecentPostsLocalStorage } from "@/util/recentPostsLocalStorageLogic";
import { searchSelectedNoticeApiResponse } from "@/util/api";
import Link from "next/link";

const StoreDetailPage = () => {
  const router = useParams<{ shopId: string; noticeId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setIem] = useState<StoreDetailPostType>();
  const [items, setItems] = useState<NoticeItem[]>([]);

  useEffect(() => {
    // handleSearchNoticeClick();
    getSelectedNotice(router.noticeId, router.shopId);
    handleGetRecentPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSelectedNotice = async (noticeId: string, shopId: string) => {
    setLoading(true);
    try {
      const response = await searchSelectedNoticeApiResponse(shopId, noticeId);
      setIem(response);
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
    }
  };

  const saveOnLocalStorage = (data: NoticeItem) => {
    // Save the data to local storage
    if (data) {
      saveRecentPostsLocalStorage(data);
    }
    const recentPosts = localStorage.getItem("recentPosts");
  };

  return (
    <div
      className={`h-100vh flex w-full flex-col items-center justify-center gap-10`}
    >
      <NoticeDetail data={item} />
      <div className={`flex flex-col gap-5`}>
        <div className={`text-[28px] font-bold`}>최근에 본 공고</div>
        <div
          className={`mb-[100px] flex w-[968px] flex-row flex-wrap gap-4 tab:w-full`}
        >
          {items.length === 0 && (
            <div
              className={`w-full rounded-xl bg-gray-10 py-[150px]  text-center text-[20px] `}
            >
              최근에 본 공고가 없습니다.
            </div>
          )}
          {loading
            ? Array.from({ length: 5 }, (_, index) => (
                <PostSkeleton key={index} />
              ))
            : items.map((item) => (
                <Link
                  href={`/user/noticeDetail/${item.item.id}/${item.item.shop.item.id}`}
                  key={item.item.id}
                  onClick={() => saveOnLocalStorage(item)}
                >
                  <Post
                    key={item.item.id}
                    imgUrl={item.item.shop.item.imageUrl}
                    shopName={item.item.shop.item.name}
                    address1={item.item.shop.item.address1}
                    hourlyPay={item.item.hourlyPay}
                    startTime={
                      formatApiDateData(
                        item.item.startsAt,
                        item.item.workhour,
                      )[0]
                    }
                    startHour={
                      formatApiDateData(
                        item.item.startsAt,
                        item.item.workhour,
                      )[1]
                    }
                    originalHourlyPay={item.item.shop.item.originalHourlyPay}
                    state={!item.item.closed}
                  />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default StoreDetailPage;

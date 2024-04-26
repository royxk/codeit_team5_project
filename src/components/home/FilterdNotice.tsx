"use client";
import React, { useEffect, useState } from "react";
import Post from "../common/Post/Post";
import { formatApiDateData } from "@/util/formatDate";
import type { NoticeResponse, NoticeItem } from "@/app/page";
import { Query, searchNoticeApiResponse } from "@/util/api";
import PostSkeleton from "../common/Post/PostSkeleton";
import Pagination from "../common/Pagination";
import Link from "next/link";

import type {
  AdvancedFilterQuery,
  ConvertedSortType,
} from "@/util/convertData";

import { saveRecentPostsLocalStorage } from "@/util/recentPostsLocalStorageLogic";

interface FIlterNoticeProps {
  isLoading: boolean;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  setIsFilterChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterChanged: boolean;
  sortedAdvancedQuery: AdvancedFilterQuery | null;
  sortedQuery: ConvertedSortType | null;
  filterdNoticeList: NoticeResponse | null;
  setFilterdNoticeList: React.Dispatch<
    React.SetStateAction<NoticeResponse | null>
  >;
}
const FilterdNotice = ({
  isLoading,
  pageCount,
  setPageCount,
  setIsFilterChanged,
  isFilterChanged,
  sortedAdvancedQuery,
  sortedQuery,
  filterdNoticeList,
  setFilterdNoticeList,
}: FIlterNoticeProps) => {
  const handlePageData = async (num: number) => {
    const offsetNum = num * 6;
    console.log(sortedAdvancedQuery);
    console.log(sortedQuery);

    const res = await searchNoticeApiResponse({
      offset: offsetNum,
      limit: 6,
      ...(sortedQuery && { sort: sortedQuery }),
      ...(sortedAdvancedQuery && { ...sortedAdvancedQuery }),
    });
    console.log(sortedQuery);
    setPageCount(res.count);

    setFilterdNoticeList(res);
    console.log(res);
    console.log(filterdNoticeList);
  };

  const saveOnLocalStorage = (data: NoticeItem) => {
    // Save the data to local storage
    if (data) {
      saveRecentPostsLocalStorage(data);
    }
    const recentPosts = localStorage.getItem("recentPosts");
    console.log(JSON.parse(recentPosts as string));
  };

  useEffect(() => {
    if (basicNoticeList) {
      setFilterdNoticeList(basicNoticeList);
    } else {
      getFilterdNoticeData({ limit: 6 });
    }
  }, [basicNoticeList]);

  if (isLoading)
    return (
      <>
        {
          <div className="grid grid-cols-3 gap-x-[14px] gap-y-[31px] tab:grid-cols-2 mob:auto-rows-auto mob:gap-2">
            {[...Array(6)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        }
      </>
    );

  return (
    <>
      <div className="flex h-[760px] flex-col gap-10 tab:h-[1150px] mob:h-[820px]">
        <div className="grid grid-cols-3 gap-x-[14px] gap-y-[31px] tab:grid-cols-2 mob:auto-rows-auto mob:gap-2">
          {filterdNoticeList?.items?.map(({ item }) =>
            item.closed ? (
              <div className="cursor-not-allowed" key={item.id}>
                <Post
                  imgUrl={item.shop.item.imageUrl}
                  shopName={item.shop.item.name}
                  address1={item.shop.item.address1}
                  hourlyPay={item.hourlyPay}
                  startTime={formatApiDateData(item.startsAt, item.workhour)[0]}
                  startHour={formatApiDateData(item.startsAt, item.workhour)[1]}
                  state={!item.closed}
                  originalHourlyPay={item.shop.item.originalHourlyPay}
                />
              </div>
            ) : (
              <Link
                href={`/noticeDetail/${item.id}/${item.shop.item.id}`}
                key={item.id}
                onClick={() => saveOnLocalStorage({ item, links: [] })}
              >
                <Post
                  imgUrl={item.shop.item.imageUrl}
                  shopName={item.shop.item.name}
                  address1={item.shop.item.address1}
                  hourlyPay={item.hourlyPay}
                  startTime={formatApiDateData(item.startsAt, item.workhour)[0]}
                  startHour={formatApiDateData(item.startsAt, item.workhour)[1]}
                  state={!item.closed}
                  originalHourlyPay={item.shop.item.originalHourlyPay}
                />
              </Link>
            ),
          )}
        </div>
        {filterdNoticeList?.items.length === 0 && (
          <>
            <div className="flex h-1/2 w-full items-center justify-center text-5xl">
              공고가 없습니다
            </div>
          </>
        )}
      </div>
      <div>{pageCount}</div>
      <Pagination
        setIsFilterChanged={setIsFilterChanged}
        pageRefreshSwitch={isFilterChanged}
        count={pageCount}
        setCurrentPageData={handlePageData}
        pageItemLimit={6}
        enableAnchorNavigation={true}
      />
    </>
  );
};

export default FilterdNotice;

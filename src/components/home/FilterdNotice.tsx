"use client";
import React, { useEffect, useState } from "react";
import Post from "../common/Post/Post";
import { formatApiDateData } from "@/util/formatDate";
import type { NoticeResponse } from "@/app/page";
import { Query, searchNoticeApiResponse } from "@/util/api";
import PostSkeleton from "../common/Post/PostSkeleton";
import Pagination from "../common/Pagination";
import Link from "next/link";
import { ConvertedSortType } from "@/util/convertData";
interface FIlterNoticeProps {
  setIsFilterChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterChanged: boolean;
  sortedQuery: ConvertedSortType | null;
  basicNoticeList: NoticeResponse | null;
}
const FilterdNotice = ({
  setIsFilterChanged,
  isFilterChanged,
  sortedQuery,
  basicNoticeList,
}: FIlterNoticeProps) => {
  const [filterdNoticeList, setFilterdNoticeList] = useState<NoticeResponse>();
  const [pageCount, setPageCount] = useState(6);
  const getFilterdNoticeData = async (query?: Query) => {
    const res = await searchNoticeApiResponse(query);
    setPageCount(res.count);
    setFilterdNoticeList(res);
  };
  const handlePageData = async (num: number) => {
    const offsetNum = num * 6;
    const res = await searchNoticeApiResponse({
      offset: offsetNum,
      limit: 6,
      ...(sortedQuery && { sort: sortedQuery }),
    });
    console.log(sortedQuery);
    setFilterdNoticeList(res);
  };
  useEffect(() => {
    if (basicNoticeList) {
      setFilterdNoticeList(basicNoticeList);
    } else {
      getFilterdNoticeData({ limit: 6 });
    }
  }, [basicNoticeList]);

  if (!filterdNoticeList)
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
          {filterdNoticeList?.items.map(({ item }) =>
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
                />
              </div>
            ) : (
              <Link
                href={`/noticeDetail/${item.shop.item.id}/${item.id}`}
                key={item.id}
              >
                <Post
                  imgUrl={item.shop.item.imageUrl}
                  shopName={item.shop.item.name}
                  address1={item.shop.item.address1}
                  hourlyPay={item.hourlyPay}
                  startTime={formatApiDateData(item.startsAt, item.workhour)[0]}
                  startHour={formatApiDateData(item.startsAt, item.workhour)[1]}
                  state={!item.closed}
                />
              </Link>
            ),
          )}
        </div>
      </div>
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

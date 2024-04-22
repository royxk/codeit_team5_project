"use client";
import React, { useEffect, useState } from "react";
import Post from "../common/Post/Post";
import { formatApiDateData } from "@/util/formatDate";
import { NoticeResponse } from "@/app/page";
import { Query, searchNoticeApiResponse } from "@/util/api";
import PostSkeleton from "../common/Post/PostSkeleton";
import Pagination from "../common/Pagination";

const FilterdNotice = () => {
  const [filterdNoticeList, setFilterdNoticeList] = useState<NoticeResponse>();

  const getFilterdNoticeData = async (query?: Query) => {
    const res = await searchNoticeApiResponse(query);
    console.log(res);
    setFilterdNoticeList(res);
  };
  const handlePageData = async (num: number) => {
    const res = await searchNoticeApiResponse({
      offset: num ? (num - 1) * 6 : 0,
      limit: 6,
      // 설정된 상세필터 적용
    });
    console.log(res);
    setFilterdNoticeList(res);
  };
  useEffect(() => {
    getFilterdNoticeData();
  }, []);

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
      <div className="grid grid-cols-3 gap-x-[14px] gap-y-[31px] pb-10 tab:grid-cols-2 mob:auto-rows-auto mob:gap-2">
        {filterdNoticeList?.items.map((item, index) => (
          <Post
            key={index}
            imgUrl={item.item.shop.item.imageUrl}
            shopName={item.item.shop.item.name}
            address1={item.item.shop.item.address1}
            hourlyPay={item.item.hourlyPay}
            startTime={
              formatApiDateData(item.item.startsAt, item.item.workhour)[0]
            }
            startHour={
              formatApiDateData(item.item.startsAt, item.item.workhour)[1]
            }
            state={!item.item.closed}
          />
        ))}
      </div>
      <Pagination
        rawPageData={filterdNoticeList.items}
        setCurrentPageData={handlePageData}
      />
    </>
  );
};

export default FilterdNotice;

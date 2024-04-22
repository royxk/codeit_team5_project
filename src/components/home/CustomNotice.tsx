"use client";
import React, { useEffect, useRef, useState } from "react";
import Post from "../common/Post/Post";
import { formatApiDateData } from "@/util/formatDate";
import { NoticeResponse } from "@/app/page";
import { searchNoticeApiResponse } from "@/util/api";
import PostSkeleton from "../common/Post/PostSkeleton";

const CustomNotice = () => {
  const [customNoticeList, setCustomNoticeList] = useState<NoticeResponse>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const getCustomNoticeData = async () => {
    const res = await searchNoticeApiResponse({
      // address: "유저의 주소 사용",
    });
    console.log(res);
    setCustomNoticeList(res);
  };

  useEffect(() => {
    getCustomNoticeData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const currentScrollPosition = scrollRef.current.scrollLeft;
        const newScrollPosition = currentScrollPosition + 312;

        scrollRef.current.scrollTo({
          left: newScrollPosition,
          behavior: "smooth",
        });

        setTimeout(() => {
          if (scrollRef?.current?.scrollLeft === currentScrollPosition) {
            scrollRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }
        }, 500);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!customNoticeList)
    return (
      <>
        {
          <div className="flex w-full snap-x items-start gap-[14px] overflow-x-scroll hide-scrollbar">
            {[...Array(3)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        }
      </>
    );

  return (
    <div
      ref={scrollRef}
      className="flex snap-x justify-start gap-[14px] overflow-x-scroll hide-scrollbar"
    >
      {customNoticeList?.items.map((item) => (
        <Post
          key={item.item.id}
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
  );
};

export default CustomNotice;

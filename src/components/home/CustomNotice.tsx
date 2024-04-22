"use client";
import S from "@/util/constants/TEST_POST_VALUES";
import React, { useEffect, useRef } from "react";
import Post from "../common/Post/Post";
import { formatApiDateData } from "@/util/formatDate";
import { NoticeResponse } from "@/app/page";
// import { formatDate } from "@/app/postTest/page";

type Props = { res: NoticeResponse };

const CustomNotice = ({ res }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  return (
    <div
      ref={scrollRef}
      className="flex w-full snap-x items-start gap-[14px] overflow-x-scroll hide-scrollbar"
    >
      {res?.items
        .slice(0, 6)
        .map((item, index) => (
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
  );
};

export default CustomNotice;

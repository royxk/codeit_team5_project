"use client";
import S from "@/util/constants/TEST_POST_VALUES";
import React, { useEffect, useRef } from "react";
import Post from "../common/Post/Post";
// import { formatDate } from "@/app/postTest/page";

type Props = {};

const CustomNotice = ({ items }: { items: [] }) => {
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
      {S.items.slice(0, 6).map((item, index) => (
        <Post
          key={index}
          imgUrl={item.item.shop.item.imageUrl}
          shopName={item.item.shop.item.name}
          address1={item.item.shop.item.address1}
          hourlyPay={item.item.hourlyPay}
          startTime={formatDate(item.item.startsAt, item.item.workhour)[0]}
          startHour={formatDate(item.item.startsAt, item.item.workhour)[1]}
          state={!item.item.closed}
        />
      ))}
    </div>
  );
};

function formatDate(startsAt: string, workhour: number): string[] {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + workhour * 3600000);

  // Ensuring month and day are two digits
  const formattedMonth = (start.getMonth() + 1).toString().padStart(2, "0");
  const formattedDay = start.getDate().toString().padStart(2, "0");
  const formattedStartHours = start.getHours().toString().padStart(2, "0");
  const formattedStartMinutes = start.getMinutes().toString().padStart(2, "0");
  const formattedEndHours = end.getHours().toString().padStart(2, "0");
  const formattedEndMinutes = end.getMinutes().toString().padStart(2, "0");

  return [
    `${start.getFullYear()}-${formattedMonth}-${formattedDay}`,
    `${formattedStartHours}:${formattedStartMinutes}~${formattedEndHours}:${formattedEndMinutes} (${workhour}시간)`,
  ];
}

export default CustomNotice;

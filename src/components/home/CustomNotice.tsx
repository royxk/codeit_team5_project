"use client";
import React, { useEffect, useRef, useState } from "react";
import Post from "../common/Post/Post";
import { formatApiDateData } from "@/util/formatDate";
import { NoticeResponse } from "@/app/page";
import { searchNoticeApiResponse } from "@/util/api";
import PostSkeleton from "../common/Post/PostSkeleton";
import Link from "next/link";

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  } as T;
}

const CustomNotice = () => {
  const [customNoticeList, setCustomNoticeList] = useState<NoticeResponse>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState<number>(326);
  const getCustomNoticeData = async () => {
    const res = await searchNoticeApiResponse({
      offset: 0,
      limit: 6,
      // address: "유저의 주소 사용",
    });
    console.log(res);
    setCustomNoticeList(res);
  };

  useEffect(() => {
    getCustomNoticeData();
  }, []);

  useEffect(() => {
    // 화면 너비에 따라 스크롤 이동 거리를 결정하는 함수
    const checkSizeAndScroll = () => {
      const newScrollDistance = window.innerWidth < 768 ? 178 : 326;
      console.log(`New scroll distance: ${newScrollDistance}px`);
      setScrollDistance(newScrollDistance);
    };

    // debounce 적용
    const debouncedCheckSize = debounce(checkSizeAndScroll, 250);

    // 이벤트 리스너 추가
    window.addEventListener("resize", debouncedCheckSize);

    // 초기 스크롤 이동 거리 설정
    checkSizeAndScroll();

    // 10초마다 스크롤 이동
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const currentScrollPosition = scrollRef.current.scrollLeft;
        console.log(`Current scroll position: ${currentScrollPosition}px`);

        const newScrollPosition = currentScrollPosition + scrollDistance;
        console.log(`Scrolling to: ${newScrollPosition}px`);

        scrollRef.current.scrollTo({
          left: newScrollPosition,
          behavior: "smooth",
        });

        setTimeout(() => {
          if (scrollRef?.current?.scrollLeft === currentScrollPosition) {
            console.log("Reached the end, scrolling back to start.");
            scrollRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }
        }, 1000);
      }
    }, 10000);

    // 컴포넌트 언마운트 시 이벤트 리스너와 인터벌 정리
    return () => {
      window.removeEventListener("resize", debouncedCheckSize);
      clearInterval(interval);
    };
  }, [scrollDistance]);

  if (!customNoticeList)
    return (
      <>
        {
          <div className="flex w-full items-start gap-[14px] overflow-x-scroll hide-scrollbar mob:gap-2">
            {[...Array(5)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        }
      </>
    );

  return (
    <div
      ref={scrollRef}
      className="flex w-full justify-start gap-[14px] overflow-x-scroll hide-scrollbar mob:gap-2"
    >
      {customNoticeList?.items.map(({ item }) => (
        <Link href={`/${item.shop.item.id}/${item.id}`} key={item.id}>
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
      ))}
    </div>
  );
};

export default CustomNotice;

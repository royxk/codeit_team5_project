"use client";
import React, { useEffect, useRef, useState } from "react";
import Post from "../common/Post/Post";
import StoreDetailCardBorder from "../common/StoreDetail/StoreDetailCardBorder";
import Button from "../common/Button";
import { formatApiDateData } from "@/util/formatDate";
import { getCookie } from "@/util/cookieSetting";
import { searchShopNoticeApiResponse } from "@/util/api";
import Link from "next/link";

interface PostDataType {
  closed: boolean;
  description: string;
  hourlyPay: number;
  id: string;
  startsAt: string;
  workhour: number;
}

const PostEmployer = ({ shopData, fetchedNoticeList }: any) => {
  const [noticeList, setNoticeList] = useState(
    fetchedNoticeList.items || undefined,
  );
  const NOTICE_COUNT = fetchedNoticeList.count;
  let fetchOffset = 6;

  const observeObject = useRef<HTMLDivElement>(null);

  async function handleInfiniteScroll(observer: IntersectionObserver) {
    const sid = getCookie("sid");

    const newNoticeList = await searchShopNoticeApiResponse(sid!, {
      offset: fetchOffset,
      limit: 6,
    });
    const previousNotice = noticeList;
    setNoticeList([...previousNotice, ...newNoticeList.items]);

    if (fetchOffset + 6 < NOTICE_COUNT) {
      fetchOffset += 6;
    } else {
      observer.unobserve(observeObject.current!);
    }
  }

  // useEffect를 이용하여 IntersectionObserver을 등록
  useEffect(() => {
    const lastNoticeObserver = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          handleInfiniteScroll(lastNoticeObserver);
        }
      });
    });
    if (NOTICE_COUNT > 6) {
      lastNoticeObserver.observe(observeObject.current!);
    }
  }, []);

  if (noticeList === undefined) {
    return (
      <div>
        <p className="h1 text-block mob:h3 mb-8 mob:mb-4">등록한 공고</p>
        <StoreDetailCardBorder isBgWhite={true}>
          <div className="body1 mob:body2 flex w-full flex-col items-center justify-center gap-6">
            공고를 등록해 보세요{" "}
            <div className="w-[348px] mob:w-[108px]">
              <Button size="full" color="red">
                공고 등록하기
              </Button>
            </div>
          </div>
        </StoreDetailCardBorder>
      </div>
    );
  }

  function dataConvertComponentStandard(PostData: PostDataType) {
    return {
      imgUrl: shopData.item.imageUrl,
      shopName: shopData.item.name,
      address1: shopData.item.address1,
      hourlyPay: PostData.hourlyPay,
      state: !PostData.closed,
      startTime: formatApiDateData(PostData.startsAt, PostData.workhour)[0],
      startHour: formatApiDateData(PostData.startsAt, PostData.workhour)[1],
    };
  }

  return (
    <div className="tab:max-w-[42.375rem]">
      <p className="h1 text-block mob:h3 mb-8">내가 등록한 공고</p>
      <div className="grid grid-cols-3 gap-x-[0.875rem] gap-y-8 tab:grid-cols-2">
        {noticeList.map(({ item }: { item: PostDataType }) => {
          const {
            imgUrl,
            shopName,
            address1,
            hourlyPay,
            state,
            startTime,
            startHour,
          } = dataConvertComponentStandard(item);
          return (
            <Link key={item.id} href={`/user/employer/notice/${item.id}`}>
              <Post
                imgUrl={imgUrl}
                shopName={shopName}
                address1={address1}
                hourlyPay={hourlyPay}
                state={state}
                startTime={startTime}
                startHour={startHour}
                originalHourlyPay={shopData.item.originalHourlyPay}
              />
            </Link>
          );
        })}
      </div>
      <div className="h-[1px] w-full" ref={observeObject} />
    </div>
  );
};

export default PostEmployer;

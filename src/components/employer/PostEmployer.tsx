"use client";
import React, { useEffect, useRef, useState } from "react";
import Post from "../common/Post/Post";
import StoreDetailCardBorder from "../common/NoticeDetail/NoticeDetailCardBorder";
import Button from "../common/Button";
import { formatApiDateData } from "@/util/formatDate";
import { getCookie } from "@/util/cookieSetting";
import {
  searchShopInformationApiResponse,
  searchShopNoticeApiResponse,
} from "@/util/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PostDataType {
  closed: boolean;
  description: string;
  hourlyPay: number;
  id: string;
  startsAt: string;
  workhour: number;
}

const PostEmployer = ({ fetchedNoticeList }: any) => {
  const [shopData, setShopData] = useState<any>(undefined);
  const [noticeList, setNoticeList] = useState<any>(undefined);
  const NOTICE_COUNT = fetchedNoticeList?.count;
  const router = useRouter();

  let fetchOffset = 12;

  const observeObject = useRef<HTMLDivElement>(null);

  async function handleInfiniteScroll(observer: IntersectionObserver) {
    const sid = getCookie("sid");
    if (sid !== "") {
      const newFetchList = await searchShopNoticeApiResponse(sid!, {
        limit: fetchOffset,
      });

      setNoticeList(newFetchList.items);

      if (fetchOffset < NOTICE_COUNT) {
        fetchOffset += 6;
      } else {
        observer.unobserve(observeObject.current!);
      }
    }
  }

  const handleNoticeListReset = async () => {
    const sid = getCookie("sid")!;
    if (sid !== "") {
      const res = await searchShopNoticeApiResponse(sid, { limit: 6 });
      setNoticeList(res.items);
    }
  };

  const handleRefreshShopData = async () => {
    const sid = getCookie("sid");
    if (sid !== "") {
      const shopData = await searchShopInformationApiResponse(sid as string);
      setShopData(shopData);
    }
  };

  // useEffect를 이용하여 IntersectionObserver을 등록
  useEffect(() => {
    handleRefreshShopData();
    handleNoticeListReset();

    if (NOTICE_COUNT !== 0 && shopData !== undefined) {
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
    }
  }, []);

  if (shopData === undefined || shopData === null || getCookie("sid") === "")
    return;
  if (noticeList?.length === 0 || noticeList === undefined) {
    return (
      <div className="mx-auto flex w-full justify-center bg-gray-5 px-8 py-[3.75rem] tab:mx-0">
        <div className="w-full max-w-[60.25rem] tab:flex tab:justify-center">
          <div>
            <p className="h1 text-block mob:h3 mb-8 mob:mb-4">등록한 공고</p>
            <StoreDetailCardBorder isBgWhite={true}>
              <div className="body1 mob:body2 flex w-full flex-col items-center justify-center gap-6">
                공고를 등록해 보세요{" "}
                <div className="w-[348px] mob:w-[108px]">
                  <Button
                    size="full"
                    color="red"
                    onClick={() => router.push("/user/employer/notice")}
                  >
                    공고 등록하기
                  </Button>
                </div>
              </div>
            </StoreDetailCardBorder>
          </div>
        </div>
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
    <div className="mx-auto flex w-full justify-center bg-gray-5 px-8 py-[3.75rem] tab:mx-0">
      <div className="w-full max-w-[60.25rem] tab:flex tab:justify-center">
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
                <React.Fragment key={item.id}>
                  {state ? (
                    <Link href={`/user/employer/notice/${item.id}`}>
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
                  ) : (
                    <div className="cursor-not-allowed">
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
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="h-[1px] w-full" ref={observeObject} />
        </div>
      </div>
    </div>
  );
};

export default PostEmployer;

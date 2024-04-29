import React from "react";
import Image from "next/image";
import StoreDetailButtons from "./NoticeDetailButtons";
import Button from "../Button";
import { StoreDetailPostType } from "./NoticeDetailTypes";
import StoreDetailCardBorder from "./NoticeDetailCardBorder";
import Link from "next/link";
import { formatApiDateData } from "@/util/formatDate";
import ImageLoadingComponents from "./ImageLoadingComponents";
import TextLoadingComponents from "./TextLoadingComponents";

/**
 *
 * @param data 현재 가게나 해당 공고 요청한 api 리스폰스를 받아올 것으로 예상되는 인자입니다.
 * @description data.item이 존재하지 않을 경우 undefined를 반환하는 점을 이용해 가게 페이지에서의 가게 추가 기능 또한 겸할 예정입니다. 알바생의 가게 생성을 방지하기 위해, 유효하지 않은 공고 페이지로의 접근의 경우 상위 웹페이지 단에서의 리다이렉트가 필요합니다.
 * @returns
 */
const NoticeDetail = ({ data }: { data?: StoreDetailPostType }) => {
  const item = data?.item;

  // 가게 데이터가 유효하지 않을 경우. 현재 유저에 대한 구분이 없으므로, 잘못된 공고 링크로의 접근의 경우 추가 리다이렉트가 필요합니다.
  if (item === undefined)
    return (
      <>
        <div className="mb-6 mob:mb-4 ">
          <div>
            <p className="body1-bold mob:body2-bold mb-2 text-primary">식당</p>
            <h1 className="h1 mob:h3 text-black">불러오는 중</h1>
          </div>
        </div>
        <StoreDetailCardBorder isBgWhite={true}>
          <div className="body1 m-auto flex flex-col items-center justify-center py-9">
            정보를 불러오는 중입니다...
            <div className="mt-6 flex w-full min-w-[21.625rem] items-center justify-center mob:mt-4 mob:min-w-[6.75rem]">
              <Image
                width={40}
                height={40}
                alt=""
                className="animate-spin"
                src={"/store-detail-sample/loading.png"}
              />
            </div>
          </div>{" "}
        </StoreDetailCardBorder>

        <div className="mt-6 w-full rounded-lg bg-gray-10 p-8">
          <h6 className="body1-bold mob:body2-bold">공고 설명</h6>
          <textarea
            className="body1 mob:body2 mt-3 h-min w-full resize-none overflow-y-auto"
            value={"정보를 불러오는 중입니다."}
            disabled
          />
        </div>
      </>
    );

  const noticeHourlyPay = `${item.hourlyPay.toLocaleString()}원`;
  const imageUrl = item.shop.item.imageUrl;
  const workHour = formatApiDateData(item?.startsAt, item?.workhour);

  const shopData = item.shop.item;
  const isClosed = item.closed;

  return (
    <div className="w-[968px] tab:w-full">
      <div className="mb-6 mob:mb-4 ">
        <div>
          <p className="body1-bold mob:body2-bold mb-2 text-primary">식당</p>
          <h1 className="h1 mob:h3 text-black">
            {shopData.name ? shopData.name : "불러오는 중"}
          </h1>
        </div>
      </div>

      <StoreDetailCardBorder isBgWhite={true}>
        <div className="relative h-full w-full  overflow-hidden rounded-xl tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              sizes="540px"
              className="object-cover"
              fill
              alt=""
            />
          ) : (
            <ImageLoadingComponents />
          )}
          {isClosed && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
              <h1 className="h1 text-white">마감 완료</h1>
            </div>
          )}
        </div>
        <section className="flex min-w-[21.625rem] flex-col justify-between pt-4 tab:min-w-0 tab:gap-10 mob:gap-6 mob:pt-3">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="body1-bold mob:body2-bold text-primary">시급</h1>
              <div className="mt-2 flex h-10 w-full items-center gap-2 mob:gap-1">
                {item.hourlyPay ? (
                  <>
                    <h2 className="h1 mob:h2 overflow-x-auto text-nowrap">
                      {noticeHourlyPay}
                    </h2>

                    <a className="body2-bold mob:caption flex h-9 w-min cursor-default items-center text-nowrap rounded-[1.25rem] bg-primary px-3 text-center text-white mob:h-6 mob:px-2">
                      기존 시급보다{" "}
                      {(
                        (item.hourlyPay / item.shop.item.originalHourlyPay) *
                        100
                      ).toFixed(0)}
                      %
                    </a>
                  </>
                ) : (
                  <TextLoadingComponents />
                )}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-rwo relative mr-1 h-5 w-5 ">
                <Image src={"/post/time.svg"} alt="" fill />
              </div>
              {item.hourlyPay ? (
                <a className="body1 mob:body2 text-gray-50">
                  {" " + workHour[0] + " " + workHour[1]}
                </a>
              ) : (
                <TextLoadingComponents />
              )}
            </div>

            <div className="flex items-center">
              <div className="flex-rwo relative mr-1 h-5 w-5 ">
                <Image src={"/post/location.svg"} alt="" fill />
              </div>
              {shopData.address1 ? (
                <p className="body1 mob:body2 text-gray-50">
                  {shopData.address1}
                </p>
              ) : (
                <TextLoadingComponents />
              )}
            </div>

            {shopData.description ? (
              <textarea
                disabled
                className="body1 mob:body2 h-16 w-full resize-none overflow-y-auto bg-transparent"
                value={shopData.description}
              />
            ) : (
              <div className="h-16 w-full">
                <TextLoadingComponents />
              </div>
            )}
          </div>
          <StoreDetailButtons isClosed={isClosed} />
        </section>
      </StoreDetailCardBorder>

      <div className="mt-6 w-full rounded-lg bg-gray-10 p-8">
        <h6 className="body1-bold mob:body2-bold">공고 설명</h6>
        <textarea
          className="body1 mob:body2 mt-3 h-min w-full resize-none overflow-y-auto"
          value={
            shopData.name
              ? item.description || "이 공고에 대한 자세한 설명이 없습니다."
              : "정보를 불러오는 중입니다."
          }
          disabled
        />
      </div>
    </div>
  );
};

export default NoticeDetail;

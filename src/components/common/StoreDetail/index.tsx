import React from "react";
import Image from "next/image";
import StoreDetailButtons from "./StoreDetailButtons";
import Button from "../Button";
import StoreDetailProps from "./StoreDetailTypes";
import { STORE_DETAIL_ASSIGNED } from "@/util/constants/STORE_DETAIL_ASSIGNED";
import StoreDetailCardBorder from "./StoreDetailCardBorder";
import Link from "next/link";

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
    `${start.getFullYear()}-${formattedMonth}-${formattedDay} `,
    `${formattedStartHours}:${formattedStartMinutes}~${formattedEndHours}:${formattedEndMinutes} (${workhour}시간)`,
  ];
}

/**
 *
 * @param data 현재 가게나 해당 공고 요청한 api 리스폰스를 받아올 것으로 예상되는 인자입니다.
 * @description data.item이 존재하지 않을 경우 undefined를 반환하는 점을 이용해 가게 페이지에서의 가게 추가 기능 또한 겸할 예정입니다. 알바생의 가게 생성을 방지하기 위해, 유효하지 않은 공고 페이지로의 접근의 경우 상위 웹페이지 단에서의 리다이렉트가 필요합니다.
 * @returns
 */
const StoreDetail = ({ data }: { data: StoreDetailProps }) => {
  const item = data?.item;

  // 가게 데이터가 유효하지 않을 경우. 현재 유저에 대한 구분이 없으므로, 잘못된 공고 링크로의 접근의 경우 추가 리다이렉트가 필요합니다.
  if (item === undefined)
    return (
      <>
        <h1 className="h1 mob:h3 mob:body2-bold mb-6 text-black mob:mb-4">
          내 가게
        </h1>
        <StoreDetailCardBorder isBgWhite={true}>
          <div className="body1 m-auto py-9 text-center">
            내 가게를 소개하고 공고도 등록해 보세요.
            <div className="mt-6 w-full min-w-[21.625rem] mob:mt-4 mob:min-w-[6.75rem]">
              <Link href={"/employer/assign"}>
                <Button size="full" color="red" className="mob:body2-bold">
                  가게 등록하기
                </Button>
              </Link>
            </div>
          </div>{" "}
        </StoreDetailCardBorder>
      </>
    );

  const isPostPage = "shop" in item;
  const cardTitle = isPostPage
    ? `${item.hourlyPay.toLocaleString()}원`
    : item.name;
  const imageUrl = isPostPage ? item.shop.item.imageUrl : item?.imageUrl;
  const workHour = isPostPage
    ? formatDate(item.startsAt, item.workhour)
    : "false";

  const shopData = isPostPage ? item.shop.item : item;
  const isClosed = isPostPage ? item.closed : false;

  return (
    <div className="w-[968px] tab:w-full">
      <div className="mb-6 mob:mb-4 ">
        {isPostPage ? (
          <div>
            <p className="body1-bold mob:body2-bold mb-2 text-primary">식당</p>
            <h1 className="h1 mob:h3 text-black">{shopData.name}</h1>
          </div>
        ) : (
          <h1 className="h1 mob:h3 mo text-black">내 가게</h1>
        )}
      </div>

      <StoreDetailCardBorder isBgWhite={isPostPage}>
        <div className="relative h-full w-full  overflow-hidden rounded-xl tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
          <Image src={`${imageUrl}`} className="object-cover" fill alt="" />
        </div>
        <section className="flex min-w-[21.625rem] flex-col justify-between pt-4 tab:min-w-0 tab:gap-10 mob:gap-6 mob:pt-3">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="body1-bold mob:body2-bold text-primary">
                {isPostPage ? "시급" : "가게"}
              </h1>
              <div className="mt-2 flex items-center gap-2 mob:gap-1">
                <h2 className="h1 mob:h2">{cardTitle}</h2>
                {isPostPage && (
                  <a className="body2-bold mob:caption flex h-9 w-min cursor-default items-center text-nowrap rounded-[1.25rem] bg-primary px-3 text-center text-white mob:h-6 mob:px-2">
                    기존 시급보다{" "}
                    {(
                      (item.hourlyPay / item.shop.item.originalHourlyPay) *
                      100
                    ).toFixed(0)}
                    %
                  </a>
                )}
              </div>
            </div>

            {isPostPage && (
              <div className="flex items-center">
                <div className="flex-rwo relative mr-1 h-5 w-5 ">
                  <Image src={"/post/time.svg"} alt="" fill />
                </div>
                <a className="body1 mob:body2 text-gray-50">{workHour}</a>
              </div>
            )}

            <div className="flex items-center">
              <div className="flex-rwo relative mr-1 h-5 w-5 ">
                <Image src={"/post/location.svg"} alt="" fill />
              </div>
              <p className="body1 mob:body2 text-gray-50">
                {shopData.address1}
              </p>
            </div>

            <textarea
              disabled
              className={`body1 mob:body2 w-full resize-none overflow-y-scroll bg-transparent ${isPostPage ? "h-16" : "h-20"}`}
              value={shopData.description}
            />
          </div>
          <StoreDetailButtons
            isClosed={isClosed}
            shopId={shopData.id}
            postId={item.id}
          />
        </section>
      </StoreDetailCardBorder>
      {isPostPage ? (
        <div className="mt-6 w-full rounded-lg bg-gray-10 p-8">
          <h6 className="body1-bold mob:body2-bold">공고 설명</h6>
          <textarea
            className="body1 mob:body2 mt-3 h-min resize-none"
            value={item.description}
            disabled
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StoreDetail;

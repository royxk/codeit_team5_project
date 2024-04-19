import React from "react";
import Image from "next/image";
import StoreDetailButtons from "./StoreDetailButtons";
import Button from "../Button";
import StoreDetailProps from "./StoreDetailTypes";
import { STORE_DETAIL_ASSIGNED } from "@/util/constants/STORE_DETAIL_ASSIGNED";

const ERR_MESSAGE = {
  address1: "에러에러에러에러",
  description: "에러에러에러에러",
};

const StoreDetail = ({ data }: StoreDetailProps) => {
  const item = Boolean(data?.item) ? data : null;

  const isDataExist = item !== null;
  const isPostPage = isDataExist && "shop" in item.item;
  const imageUrl = isPostPage
    ? item.item.shop.item.imageUrl
    : item?.item.imageUrl;
  const shopData = item?.item.shop?.item || item?.item || ERR_MESSAGE;
  const rawHourlyPay = item?.item.hourlyPay;

  const assignedWorkers = STORE_DETAIL_ASSIGNED;

  return (
    <main
      className={`flex h-[22.25rem] w-full max-w-[60.25rem] flex-row gap-x-8 overflow-hidden rounded-xl border-[1px] border-gray-20 p-6
                  tab:h-auto tab:flex-col mob:p-5
      ${isPostPage || !isDataExist ? "bg-white" : "bg-red-10"}`}
    >
      {isDataExist ? (
        <>
          <div className="relative h-full w-full  overflow-hidden rounded-xl tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
            <Image src={`${imageUrl}`} className="object-cover" fill alt="" />
          </div>
          <section
            className="flex min-w-[21.625rem] flex-col justify-between pt-4 
                  tab:min-w-0 tab:gap-10 mob:gap-6 mob:pt-3"
          >
            <div className="flex flex-col gap-3">
              <div>
                <h1 className="body1-bold mob:body2-bold text-primary">
                  {isPostPage ? "시급" : "가게"}
                </h1>
                <h2 className="h1 mob:h2 mt-2">
                  {rawHourlyPay || item.item.name}
                </h2>
              </div>
              {isPostPage && (
                <p className="body1 mob:body2 text-gray-50">
                  {item.item.startsAt}
                </p>
              )}
              <p className="body1 mob:body2 text-gray-50">
                {shopData.address1}
              </p>
              <textarea
                disabled
                className={`body1 mob:body2 w-full overflow-y-scroll bg-transparent ${isPostPage ? "h-16" : "h-20"}`}
                value={shopData.description}
              />
            </div>
            <StoreDetailButtons
              isClosed={item.item?.closed}
              assignedWorkers={assignedWorkers}
            />
          </section>
        </>
      ) : (
        <div className="body1 m-auto py-9 text-center">
          내 가게를 소개하고 공고도 등록해 보세요.
          <div className="mt-6 w-full min-w-[21.625rem] mob:mt-4 mob:min-w-[6.75rem]">
            <Button size="full" color="red" className="mob:body2-bold">
              가게 등록하기
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default StoreDetail;

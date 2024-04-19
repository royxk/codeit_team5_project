import React from "react";
import Image from "next/image";
import StoreDetailButtons from "./StoreDetailButtons";
import Button from "../Button";
import StoreDetailProps from "./StoreDetailTypes";
import { STORE_DETAIL_ASSIGNED } from "@/util/constants/STORE_DETAIL_ASSIGNED";
import StoreDetailCardBorder from "./StoreDetailCardBorder";
import Link from "next/link";

const StoreDetail = ({ data }: { data: StoreDetailProps }) => {
  const item = data?.item;

  if (item === undefined)
    return (
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
    );
  const isPostPage = "shop" in item;

  const cardTitle = isPostPage ? item.workhour : item.name;
  const imageUrl = isPostPage ? item.shop.item.imageUrl : item?.imageUrl;
  const shopData = isPostPage ? item.shop.item : item;
  const isClosed = isPostPage ? item.closed : false;

  const assignedWorkers = STORE_DETAIL_ASSIGNED.items;

  return (
    <StoreDetailCardBorder isBgWhite={isPostPage}>
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
            <h2 className="h1 mob:h2 mt-2">{cardTitle}</h2>
          </div>
          {isPostPage && (
            <p className="body1 mob:body2 text-gray-50">{item.startsAt}</p>
          )}
          <p className="body1 mob:body2 text-gray-50">{shopData.address1}</p>
          <textarea
            disabled
            className={`body1 mob:body2 w-full overflow-y-scroll bg-transparent ${isPostPage ? "h-16" : "h-20"}`}
            value={shopData.description}
          />
        </div>
        <StoreDetailButtons isClosed={isClosed} id={item.id} />
      </section>
    </StoreDetailCardBorder>
  );
};

export default StoreDetail;

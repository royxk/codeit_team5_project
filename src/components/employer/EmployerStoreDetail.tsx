"use client";
import React, { useEffect, useState } from "react";
import { ShopDataType } from "../common/StoreDetail/StoreDetailTypes";
import StoreDetailCardBorder from "../common/StoreDetail/StoreDetailCardBorder";
import Link from "next/link";
import Button from "../common/Button";
import StoreDetailButtons from "../common/StoreDetail/StoreDetailButtons";
import Image from "next/image";

import { getCookie } from "@/util/cookieSetting";
import { searchShopInformationApiResponse } from "@/util/api";

const EmployerStoreDetail = ({ data }: { data: ShopDataType }) => {
  const [storeData, setStoreData] = useState<ShopDataType | undefined>(data);
  const shopId = getCookie("sid");

  const handleRefreshShopData = async () => {
    if (shopId) {
      const storeData = await searchShopInformationApiResponse(shopId);
      setStoreData(storeData);
    }
  };

  useEffect(() => {
    handleRefreshShopData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 가게 데이터가 유효하지 않을 경우. 현재 유저에 대한 구분이 없으므로, 잘못된 공고 링크로의 접근의 경우 추가 리다이렉트가 필요합니다.
  if (shopId === "" || storeData === undefined)
    return (
      <>
        <h1 className="h1 mob:h3 mob:body2-bold mb-6 text-black mob:mb-4">
          내 가게
        </h1>
        <StoreDetailCardBorder isBgWhite={true}>
          <div className="body1 m-auto py-9 text-center">
            내 가게를 소개하고 공고도 등록해 보세요.
            <div className="mt-6 w-full min-w-[21.625rem] mob:mt-4 mob:min-w-[6.75rem]">
              <Link href={"/user/employer/register"}>
                <Button size="full" color="red" className="mob:body2-bold">
                  가게 등록하기
                </Button>
              </Link>
            </div>
          </div>{" "}
        </StoreDetailCardBorder>
      </>
    );

  const shopData = storeData!.item;
  const cardTitle = shopData.name;
  const imageUrl = shopData.imageUrl;
  const isClosed = false;

  return (
    <div className="w-[968px] tab:w-full">
      <div className="mb-6 mob:mb-4 ">
        <h1 className="h1 mob:h3 mo text-black">내 가게</h1>
      </div>

      <StoreDetailCardBorder isBgWhite={false}>
        <div className="relative h-full w-full  overflow-hidden rounded-xl tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
          <Image src={`${imageUrl}`} className="object-cover" fill alt="" />
          {isClosed && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
              <h1 className="h1 text-white">마감 완료</h1>
            </div>
          )}
        </div>
        <section className="flex min-w-[21.625rem] flex-col justify-between pt-4 tab:min-w-0 tab:gap-10 mob:gap-6 mob:pt-3">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="body1-bold mob:body2-bold text-primary">가게</h1>
              <div className="mt-2 flex items-center gap-2 mob:gap-1">
                <h2 className="h1 mob:h2">{cardTitle}</h2>
              </div>
            </div>

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
              className="body1 mob:body2 h-20 w-full resize-none overflow-y-scroll bg-transparent"
              value={shopData.description}
            />
          </div>
          <StoreDetailButtons shopId={shopData.id} postId={shopData.id} />
        </section>
      </StoreDetailCardBorder>
    </div>
  );
};

export default EmployerStoreDetail;

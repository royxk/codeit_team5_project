import React from "react";
import Image from "next/image";
import StoreDetailButtons from "./StoreDetailButtons";
import Button from "../Button";

interface ShopDataType {
  item: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
    user?: {
      item: {
        id: string;
        email: string;
        type: string;
      };
      href: string;
    };
  };
}

interface StoreDetailPostType {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: ShopDataType;
    currentUserApplication: null;
  };
}

interface StoreDetailProps {
  data: StoreDetailPostType | ShopDataType | null;
}

const StoreDetail = ({ data }: StoreDetailProps) => {
  console.log(data);

  const isDataExist = data !== null;
  const isPostPage = isDataExist && "shop" in data.item;
  const shopData = isDataExist && "shop" in data.item ? data.item.shop : data;

  return (
    <main
      className={`flex h-[22.25rem] w-full max-w-[60.25rem] flex-row gap-x-8 overflow-hidden rounded-xl border-[1px] border-gray-20 p-6
                  tab:h-auto tab:flex-col mob:p-5
      ${isPostPage || !isDataExist ? "bg-white" : "bg-red-10"}`}
    >
      {isDataExist ? (
        <>
          <div className="relative h-full w-full  overflow-hidden rounded-xl tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
            <Image
              // src={`https://${data.item.shop.item.imageUrl}`}
              src={"/store-detail-sample/unsplash.png"}
              className="object-cover"
              fill
              alt=""
            />
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
                  {/* {isPostPage  : item.name} */}
                </h2>
              </div>
              {/* {isPostPage && (
                <p className="body1 mob:body2 text-gray-50">{shopData.}</p>
              )} */}
              <p className="body1 mob:body2 text-gray-50">
                {shopData.address1}
              </p>
              <textarea
                disabled
                className="body1 mob:body2 h-20 w-full overflow-y-scroll bg-transparent"
                value={data.description}
              />
            </div>
            <StoreDetailButtons />
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

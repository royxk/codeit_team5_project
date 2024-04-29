import React from "react";
import StoreDetailCardBorder from "./NoticeDetailCardBorder";
import ImageLoadingComponents from "./ImageLoadingComponents";
import TextLoadingComponents from "./TextLoadingComponents";
import StoreDetailButtons from "./NoticeDetailButtons";
import Image from "next/image";

const NoticeDetailSkeleton = () => {
  return (
    <StoreDetailCardBorder isBgWhite={true}>
      <div className="relative h-full w-full  overflow-hidden rounded-xl tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
        <ImageLoadingComponents />
      </div>
      <section className="flex min-w-[21.625rem] flex-col justify-between pt-4 tab:min-w-0 tab:gap-10 mob:gap-6 mob:pt-3">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="body1-bold mob:body2-bold text-primary">시급</h1>
            <div className="mt-2 flex h-10 w-full items-center gap-2 mob:gap-1">
              <TextLoadingComponents />
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-rwo relative mr-1 h-5 w-5 ">
              <Image src={"/post/time.svg"} alt="" fill />
            </div>

            <TextLoadingComponents />
          </div>

          <div className="flex items-center">
            <div className="flex-rwo relative mr-1 h-5 w-5 ">
              <Image src={"/post/location.svg"} alt="" fill />
            </div>

            <TextLoadingComponents />
          </div>

          <div className="h-16 w-full">
            <TextLoadingComponents />
          </div>
        </div>
        <StoreDetailButtons isClosed={true} />
      </section>
    </StoreDetailCardBorder>
  );
};

export default NoticeDetailSkeleton;

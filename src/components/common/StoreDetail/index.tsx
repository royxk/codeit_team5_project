import React from "react";
import Image from "next/image";
import StoreDetailButtons from "./StoreDetailButtons";

interface StoreDetailProps {
  isEmployerMainPage?: boolean;
}

const sampleData = {
  name: "도토리 식당",
  dueTime: "2023-01-02 15:00~18:00 (3시간)",
  mainAddress: "서울시 송파구",
  description:
    "알바하기 편한 너구리네 라면집!  라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다. ㅁㄴㅇㄹㅇㄴㅁㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄹㅇㅁㄴㄹㅁㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㅁㄹㅇㄴㅁㄹㅁㅇㄴㄹㅁㅇㄴ ㄹㅇㄴㄹㅁㅇㄴ ㄹㅁㅇㄴㄹㅁㅇㄴㄹㅇㄴㄹㅁㅇㄴㅇㄹㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴ ㄹㅇㄴㅁ ㄹㅇㄴㄹ ㅇㄴㅁ ㄹㅁㅇㄴ ㄹㅁㅇㄴ ㄹ",
};

const StoreDetail = ({ data = sampleData }) => {
  const isPostPage = "dueTime" in data;

  return (
    <main
      className={`flex h-[22.25rem] w-full max-w-[60.25rem] flex-row gap-x-8 overflow-hidden rounded-xl border-[1px] border-gray-20 p-6
                  tab:h-auto tab:flex-col mob:p-5
      ${!isPostPage ? "bg-red-10" : "bg-white"}`}
    >
      <div className="relative h-full w-full  overflow-hidden rounded-xl tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
        <Image
          src={`/store-detail-sample/unsplash.png`}
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
            <h2 className="h1 mob:h2 mt-2">{data.name}</h2>
          </div>
          {isPostPage && (
            <p className="body1 mob:body2 text-gray-50">{data.dueTime}</p>
          )}
          <p className="body1 mob:body2 text-gray-50">{data.mainAddress}</p>
          <textarea
            disabled
            className="body1 mob:body2 h-20 w-full overflow-y-scroll bg-transparent"
            value={data.description}
          />
        </div>
        <StoreDetailButtons />
      </section>
    </main>
  );
};

export default StoreDetail;

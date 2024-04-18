import StoreDetail from "@/components/common/StoreDetail";
import React from "react";

type Props = {};

const sampleData = {
  name: "도토리 식당",
  mainAddress: "서울시 송파구",
  description:
    "알바하기 편한 너구리네 라면집!  라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다. ㅁㄴㅇㄹㅇㄴㅁㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄹㅇㅁㄴㄹㅁㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㅁㄹㅇㄴㅁㄹㅁㅇㄴㄹㅁㅇㄴ ㄹㅇㄴㄹㅁㅇㄴ ㄹㅁㅇㄴㄹㅁㅇㄴㄹㅇㄴㄹㅁㅇㄴㅇㄹㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴ ㄹㅇㄴㅁ ㄹㅇㄴㄹ ㅇㄴㅁ ㄹㅁㅇㄴ ㄹㅁㅇㄴ ㄹ",
};

const StoreDetailPageTest = (props: Props) => {
  return (
    <div className="p-8">
      <StoreDetail data={sampleData} />
    </div>
  );
};

export default StoreDetailPageTest;

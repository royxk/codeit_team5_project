import React from "react";
import Button from "../Button";

interface StoreDetailPostProps {}

const data = {
  name: "도토리 식당",
  mainAddress: "서울시 송파구",
  description:
    "알바하기 편한 너구리네 라면집!  라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다. ㅁㄴㅇㄹㅇㄴㅁㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄹㅇㅁㄴㄹㅁㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㅁㄹㅇㄴㅁㄹㅁㅇㄴㄹㅁㅇㄴ ㄹㅇㄴㄹㅁㅇㄴ ㄹㅁㅇㄴㄹㅁㅇㄴㄹㅇㄴㄹㅁㅇㄴㅇㄹㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴ ㄹㅇㄴㅁ ㄹㅇㄴㄹ ㅇㄴㅁ ㄹㅁㅇㄴ ㄹㅁㅇㄴ ㄹ",
};

const Post = ({ isUserEmployer }: any) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="body1-bold text-primary">시급</h1>
          <h2 className="h1 mt-2">{data.name}</h2>
        </div>
        <p className="body1 text-gray-50">2023-01-02 15:00~18:00 (3시간)</p>
        <p className="body1 text-gray-50">{data.mainAddress}</p>
        <textarea
          disabled
          className="body1 h-20 w-full overflow-y-scroll bg-transparent"
          value={data.description}
        />
      </div>
      <div className="flex gap-2">
        <Button size="full" color="red">
          공고 편집하기
        </Button>
      </div>
    </>
  );
};

export default Post;

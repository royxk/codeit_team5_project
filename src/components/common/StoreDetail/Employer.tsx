import React from "react";
import Button from "../Button";

type Props = {};

const data = {
  name: "도토리 식당",
  mainAddress: "서울시 송파구",
  description:
    "알바하기 편한 너구리네 라면집!  라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.",
};

const Employer = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="body1-bold text-primary">식당</h1>
          <h2 className="h1 mt-2">{data.name}</h2>
        </div>
        <div className="body1 text-gray-50">{data.mainAddress}</div>
        <textarea disabled className="body1 h-20 w-full bg-transparent">
          {data.description}
        </textarea>
      </div>
      <div className="flex  gap-2">
        <Button size="full" color="white">
          편집하기
        </Button>
        <Button size="full" color="red">
          공고 등록하기
        </Button>
      </div>
    </>
  );
};

export default Employer;

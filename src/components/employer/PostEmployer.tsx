import EMPLOYER_POST_LIST from "@/util/constants/EMPLOYER_POST_LIST";
import React from "react";
import Post from "../common/Post/Post";

type Props = {};

interface PostDataType {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

// startTime: string;
// startHour: string;

const PostEmployer = (props: Props) => {
  const data = EMPLOYER_POST_LIST;

  function DataConvertComponentStandard(PostData: PostDataType) {
    return {
      imgUrl: "imgUrl",
      shopName: "shopName",
      address1: "address1",
      hourlyPay: PostData.hourlyPay,
      state: PostData.closed,
      startTime: "asdf",
      startHour: "asdf",
    };
  }

  return (
    <div>
      <p className="h1 text-block mb-8">내가 등록한 공고</p>
      <div className="grid grid-cols-3 gap-x-[0.875rem] gap-y-8">
        {data.items.map((item) =>
          Post(DataConvertComponentStandard(item.item)),
        )}
      </div>
    </div>
  );
};

export default PostEmployer;

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

function formatDate(startsAt: string, workhour: number): string[] {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + workhour * 3600000);

  // Ensuring month and day are two digits
  const formattedMonth = (start.getMonth() + 1).toString().padStart(2, "0");
  const formattedDay = start.getDate().toString().padStart(2, "0");
  const formattedStartHours = start.getHours().toString().padStart(2, "0");
  const formattedStartMinutes = start.getMinutes().toString().padStart(2, "0");
  const formattedEndHours = end.getHours().toString().padStart(2, "0");
  const formattedEndMinutes = end.getMinutes().toString().padStart(2, "0");

  return [
    `${start.getFullYear()}-${formattedMonth}-${formattedDay}`,
    `${formattedStartHours}:${formattedStartMinutes}~${formattedEndHours}:${formattedEndMinutes} (${workhour}시간)`,
  ];
}

const PostEmployer = ({ data }: any) => {
  const data2 = EMPLOYER_POST_LIST;

  function DataConvertComponentStandard(PostData: PostDataType) {
    return {
      imgUrl: data.item.imageUrl,
      shopName: data.item.name,
      address1: data.item.address1,
      hourlyPay: PostData.hourlyPay,
      state: PostData.closed,
      startTime: formatDate(PostData.startsAt, PostData.workhour)[0],
      startHour: formatDate(PostData.startsAt, PostData.workhour)[1],
    };
  }

  return (
    <div>
      <p className="h1 text-block mb-8">내가 등록한 공고</p>
      <div className="grid grid-cols-3 gap-x-[0.875rem] gap-y-8">
        {data2.items.map((item) =>
          Post(DataConvertComponentStandard(item.item)),
        )}
      </div>
    </div>
  );
};

export default PostEmployer;

import EMPLOYER_POST_LIST from "@/util/constants/EMPLOYER_POST_LIST";
import React from "react";
import Post from "../common/Post/Post";
import StoreDetailCardBorder from "../common/StoreDetail/StoreDetailCardBorder";
import Button from "../common/Button";

type Props = {};

interface PostDataType {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

// 임시 함수. 수환님이 공통으로 빼주신다고 하셨으니, 그전까지만 쓸 계획
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

const PostEmployer = ({ shopData }: any) => {
  const postData = EMPLOYER_POST_LIST;
  if (postData?.items === undefined) {
    return (
      <div>
        <p className="h1 text-block mob:h3 mb-8 mob:mb-4">등록한 공고</p>
        <StoreDetailCardBorder isBgWhite={true}>
          <div className="body1 mob:body2 flex w-full flex-col items-center justify-center gap-6">
            공고를 등록해 보세요{" "}
            <div className="w-[348px] mob:w-[108px]">
              <Button size="full" color="red">
                공고 등록하기
              </Button>
            </div>
          </div>
        </StoreDetailCardBorder>
      </div>
    );
  }

  function dataConvertComponentStandard(PostData: PostDataType) {
    return {
      imgUrl: shopData.item.imageUrl,
      shopName: shopData.item.name,
      address1: shopData.item.address1,
      hourlyPay: PostData.hourlyPay,
      state: PostData.closed,
      startTime: formatDate(PostData.startsAt, PostData.workhour)[0],
      startHour: formatDate(PostData.startsAt, PostData.workhour)[1],
    };
  }

  return (
    <div>
      <p className="h1 text-block mob:h3 mb-8">내가 등록한 공고</p>
      <div className="grid grid-cols-3 gap-x-[0.875rem] gap-y-8 tab:grid-cols-2">
        {postData.items.map((item) => {
          const {
            imgUrl,
            shopName,
            address1,
            hourlyPay,
            state,
            startTime,
            startHour,
          } = dataConvertComponentStandard(item.item);
          return (
            <Post
              imgUrl={imgUrl}
              shopName={shopName}
              address1={address1}
              hourlyPay={hourlyPay}
              state={state}
              startTime={startTime}
              startHour={startHour}
              key={item.item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostEmployer;

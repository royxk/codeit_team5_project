"use client";
import React from "react";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";
import {
  selectedNoticeApplyApiResponse,
  selectedNoticeApplyStatusSettingApiResponse,
} from "@/util/api";
/**
 * @param {boolean} isClosed post데이터에서 closed를 받아, 현재 공고가 마감된 상태인지를 표시하는 인자입니다.
 * @param {string} shopId 현재 공고의 아이디를 받아 해당 아이디에 해당하는 동작을 실행 시킬 것으로 예상되는 인자입니다.
 * @param {string} postId 현재 공고의 아이디를 받아 해당 아이디에 해당하는 동작을 실행 시킬 것으로 예상되는 인자입니다.
 * @returns
 */
const StoreDetailButtons = ({
  isClosed,
  shopId,
  postId,
}: {
  isClosed: boolean;
  shopId: string;
  postId: string;
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const isEmployerMainPage = pathName.includes("employer");

  // 현재 유저의 유형을 파악하는 임시 함수, context 등을 이용하여 값을 읽는 식으로 할 필요가 있음.
  const isUserEmployer = true;

  //현재 유저가 해당 공고에 지원했는지 여부, 현재는 context를 이용하여 유저 id를 받고, 특정 공고 지원 목록에 유자 아이디가 포함되었는지를 판단하여 판정할 것으로 예상됨.
  const isUserSignToWork = true;

  return (
    <>
      {isEmployerMainPage ? (
        <div className="flex gap-2">
          <Button
            size="full"
            color="white"
            onClick={() => router.push("/employer/edit")}
          >
            편집하기
          </Button>
          <Button
            size="full"
            color="red"
            onClick={() => router.push("/employer/post")}
          >
            공고 등록하기
          </Button>
        </div>
      ) : isClosed ? (
        <Button size="full" color="gray">
          {isUserEmployer ? "마감함" : "신청 불가"}
        </Button>
      ) : isUserEmployer ? (
        <Button
          size="full"
          color="white"
          onClick={() => router.push(`/employer/post/edit/${postId}`)}
        >
          공고 편집
        </Button>
      ) : (
        <>
          {isUserSignToWork ? (
            <Button
              size="full"
              color="white"
              // onClick={() => selectedNoticeApplyStatusSettingApiResponse(shopId, postId, 추가필요)}
            >
              취소하기
            </Button>
          ) : (
            <Button
              size="full"
              color="red"
              onClick={() => selectedNoticeApplyApiResponse(shopId, postId)}
            >
              신청하기
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default StoreDetailButtons;

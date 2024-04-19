"use client";
import React from "react";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";

interface assignedWorker {
  item: {
    id: string;
    status: string;
    createdAt: string;
    user: {
      id: string;
      email: string;
      type: string;
    };
    href: string;
  };
}

const StoreDetailButtons = ({
  isClosed,
  assignedWorkers,
}: {
  isClosed: boolean;
  assignedWorkers: assignedWorker[];
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const isEmployerMainPage = pathName.includes("employer");

  // 현재 유저의 유형을 파악하는 임시 함수, context 등을 이용하여 값을 읽는 식으로 할 필요가 있음.
  const isUserEmployer = true;

  //현재 유저가 해당 공고에 지원했는지 여부, 현재는 context를 이용하여 유저 id를 받고, 특정 공고 지원 목록에 유자 아이디가 포함되었는지를 판단하여 판정할 것으로 예상됨.
  // const isUserSignToWork = ;

  return (
    <>
      {isEmployerMainPage ? (
        <div className="flex gap-2">
          <Button
            size="full"
            color="white"
            onClick={() => router.push("employer/edit")}
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
      ) : isUserEmployer ? (
        <>
          {isClosed ? (
            <Button size="full" color="gray">
              편집 불가
            </Button>
          ) : (
            <Button size="full" color="gray">
              공고 편집
            </Button>
          )}
        </>
      ) : (
        <>
          {isClosed ? (
            <Button size="full" color="red">
              신청 불가
            </Button>
          ) : (
            <Button size="full" color="red">
              asdf
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default StoreDetailButtons;

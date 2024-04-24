import Link from "next/link";
import React from "react";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <>
      <div className="absolute top-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-red-10 text-6xl text-black">
        죄송합니다. 해당 페이지를 찾을 수 없습니다.
        <Link className="mt-5 text-base underline" href={"/"}>
          메인 페이지로 돌아가기
        </Link>
      </div>
    </>
  );
};
export default NotFound;

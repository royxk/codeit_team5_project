"use client";

import Button from "@/components/common/Button";
import React from "react";

const page = () => {
  const handleClick = () => {
    alert("버튼 클릭");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl">버튼 테스트</h1>
      <h2 className="text-2xl"> large</h2>
      <Button color="red" size="large" onClick={handleClick}>
        로그인 하기
      </Button>
      <Button color="white" size="large" onClick={handleClick}>
        로그인 하기
      </Button>
      <Button color="gray" size="large" onClick={handleClick}>
        신청 불가
      </Button>
      <h2 className="text-2xl"> medium</h2>
      <Button color="red" size="medium" onClick={handleClick}>
        예
      </Button>
      <Button color="white" size="medium" onClick={handleClick}>
        아니오
      </Button>
      <Button color="gray" size="medium" onClick={handleClick}>
        신청 불가
      </Button>
      <h2 className="text-2xl"> small</h2>
      <Button color="red" size="small" onClick={handleClick}>
        확인
      </Button>
      <Button color="white" size="small" onClick={handleClick}>
        아니오
      </Button>
      <Button color="gray" size="small" onClick={handleClick}>
        신청 불가
      </Button>
    </div>
  );
};

export default page;

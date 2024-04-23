import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Link from "next/link";
import React from "react";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="flex h-screen items-center justify-center pb-[300px]">
      <div className="flex h-[288px] w-[350px] flex-col">
        <div className="m-10 flex items-center justify-center">
          <img
            src="logoIcon.png"
            alt="logoIcon"
            className="h-[45px] w-[248px]"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <div className="mb-6 flex flex-col">
            <span className="mb-1">이메일</span>
            <Input inputType="email"></Input>
          </div>
          <div className="flex flex-col">
            <span className="mb-1">비밀번호</span>
            <Input inputType="password"></Input>
          </div>
        </div>
        <div className="mb-5 flex h-[48px] w-[350px] items-center justify-center">
          <Button size="large" color="red">
            로그인 하기
          </Button>
        </div>
        <div className="flex items-center justify-center font-Pretendard text-sm font-normal">
          <span className="mr-3">회원이 아니신가요?</span>{" "}
          <Link
            href="/signup"
            className="text-[#5534Da]"
            style={{ textDecoration: "underline" }}
          >
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

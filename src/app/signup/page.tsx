import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Link from "next/link";
import React from "react";
import Signin from "../signin/page";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col">
        <div className="flex h-[45px] w-[248px]">the-julge</div>
        <div className="flex flex-col">
          <div className="mb-2 flex flex-col">
            <span>이메일</span>
            <Input inputType="email"></Input>
          </div>
          <div className="mb-2 flex flex-col">
            <span>비밀번호</span>
            <Input inputType="password"></Input>
          </div>
        </div>
        <div className="flex">
          <Button size="large" color="red" className="m-2">
            로그인 하기
          </Button>
        </div>
        <div className="flex h-[19px] w-[214px]">
          <div className="flex">
            회원이 아니신가요? <span>회원가입하기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

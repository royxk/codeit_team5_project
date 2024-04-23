"use client";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmployerRegisterStore = () => {
  return (
    <main className="m-auto min-h-[calc(100vh-10.625rem)] max-w-[64.3125rem] px-8 py-[3.75rem]">
      <div className="h1 mb-8 flex items-center justify-between">
        가게 정보{" "}
        <Link href={"/employer"} className="relative h-8 w-8">
          <Image fill src={"/icons/close.svg"} alt="cancel-register-store" />
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-6"
      >
        <div className="grid w-full grid-cols-2 gap-x-5 gap-y-6">
          <Input inputType="STORE_NAME" />
          <Input inputType="WORK_TYPES" />
          <Input inputType="MAIN_ADDRESS" />
          <Input inputType="ADDRESS" />
          <Input inputType="BASE_WAGE" />
        </div>

        <div>
          <p className="body1 mb-2">가게 이미지</p>
          <input type="image" src="/require-image.svg" />
        </div>

        <div>
          <p className="mb-2">가게 설명</p>
          <textarea
            placeholder="가게에 대한 설명을 입력해 주세요."
            className="body1 h-40 w-full resize-none overflow-y-scroll border-[1px] border-gray-30 px-5 py-4"
          />
        </div>
        <div className="mt-2 flex w-full justify-center">
          <Button size="large" color="red">
            등록하기
          </Button>
        </div>
      </form>
    </main>
  );
};

export default EmployerRegisterStore;

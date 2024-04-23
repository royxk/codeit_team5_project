"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Image from "next/image";

type Props = {};

const StoreRegisterForm = (props: Props) => {
  const storeNameRef = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const basePay = useRef<HTMLInputElement>(null);
  const storeImageRef = useRef<HTMLInputElement>(null);
  const storeDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const [storeNameErr, setStoreNameErr] = useState("");
  const [address2Err, setAddress2Err] = useState("");
  const [basePayErr, setBasePayErr] = useState("");
  const [workType, setWorkType] = useState("");
  const [address1, setAddress1] = useState("");
  const [storeImagePreview, setStoreImagePreview] = useState("");
  const [imagePath, setImagePath] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(storeImageRef.current!.value);
      }}
      className="flex flex-col gap-6"
    >
      <div className="grid w-full grid-cols-2 gap-x-5 gap-y-6">
        <Input
          inputRef={storeNameRef}
          errorType={storeNameErr}
          inputType="STORE_NAME"
        />
        <Input inputType="WORK_TYPES" selectData={setWorkType} />
        <Input inputType="MAIN_ADDRESS" selectData={setAddress1} />
        <Input
          inputRef={address2Ref}
          errorType={address2Err}
          inputType="ADDRESS"
        />
        <Input
          inputRef={basePay}
          errorType={basePayErr}
          inputType="BASE_WAGE"
        />
      </div>

      <div>
        <p className="body1 mb-2">가게 이미지</p>
        <label className="relative block h-[276px] w-[483px]">
          <Image
            className="object-cover"
            src={`${imagePath ? imagePath : "/require-image.svg"}`}
            alt="store-preview"
            fill
          />
          <input
            ref={storeImageRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={() => {
              const img = storeImageRef.current!.files![0];
              setStoreImagePreview(storeImageRef.current!.value);

              const reader = new FileReader();
              reader.readAsDataURL(img);
              reader.onload = () => {
                setImagePath(reader.result as string);
              };
            }}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <p className="mb-2">가게 설명</p>
        <textarea
          ref={storeDescriptionRef}
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
  );
};

export default StoreRegisterForm;

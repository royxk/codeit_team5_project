"use client";
import React, { RefObject, useRef, useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Image from "next/image";
import {
  Address,
  Category,
  createImageApiResponse,
  createShopApiResponse,
} from "@/util/api";
import { useRouter } from "next/navigation";

const StoreRegisterForm = () => {
  const router = useRouter();

  const storeNameRef = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const basePayRef = useRef<HTMLInputElement>(null);
  const storeImageRef = useRef<HTMLInputElement>(null);
  const storeDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const [storeNameErr, setStoreNameErr] = useState("");
  const [address2Err, setAddress2Err] = useState("");
  const [basePayErr, setBasePayErr] = useState("");
  const [workType, setWorkType] = useState<Category | "">("");
  const [address1, setAddress1] = useState<Address | "">("");
  const [imagePath, setImagePath] = useState("");

  const handleInputBlur = (
    ref: RefObject<HTMLInputElement>,
    setErr: (errType: string) => void,
  ) => {
    setErr("");
    if (ref.current!.value === "") {
      setErr("BLANK_REQUIRE_VALUE");
    }
  };

  const handleSubmit = async () => {
    const storeName = storeNameRef.current!.value;
    const storeDescription = storeDescriptionRef.current!.value;
    const basePay = basePayRef.current!.value;
    const address2 = address2Ref.current!.value;
    const storeImage = storeImageRef.current!.value;

    if (
      storeName === "" ||
      basePay === "" ||
      address2 === "" ||
      storeImage === "" ||
      workType === "" ||
      address1 === ""
    ) {
      handleInputBlur(storeNameRef, setStoreNameErr);
      handleInputBlur(basePayRef, setBasePayErr);
      handleInputBlur(address2Ref, setAddress2Err);
      return;
    }
    const image = await createImageApiResponse({ name: storeImage });
    const asdf = await createShopApiResponse({
      name: storeName,
      category: workType,
      address1: address1,
      address2: address2,
      description: storeDescription,
      imageUrl: image.item.url,
      originalHourlyPay: Number(basePay),
    });
    router.push("/employer");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <div className="grid w-full grid-cols-2 gap-x-5 gap-y-6">
        <Input
          inputRef={storeNameRef}
          errorType={storeNameErr}
          inputType="STORE_NAME"
          blurEvent={() => handleInputBlur(storeNameRef, setStoreNameErr)}
        />
        <Input inputType="WORK_TYPES" selectData={setWorkType} />
        <Input inputType="MAIN_ADDRESS" selectData={setAddress1} />
        <Input
          inputRef={address2Ref}
          errorType={address2Err}
          inputType="ADDRESS"
          blurEvent={() => handleInputBlur(address2Ref, setAddress2Err)}
        />
        <Input
          inputRef={basePayRef}
          errorType={basePayErr}
          inputType="BASE_WAGE"
          blurEvent={() => handleInputBlur(basePayRef, setBasePayErr)}
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

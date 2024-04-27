"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Image from "next/image";
import {
  createImageApiResponse,
  editShopInformationApiResponse,
  putFileFetch,
} from "@/util/api";
import { useRouter } from "next/navigation";
import { getCookie } from "@/util/cookieSetting";
import Modal from "../common/SignModal";

const StoreEditForm = ({ data }: any) => {
  const {
    address1,
    address2,
    category,
    description,
    imageUrl,
    name,
    id,
    originalHourlyPay,
  } = data.item;
  const router = useRouter();

  const storeNameRef = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const basePayRef = useRef<HTMLInputElement>(null);
  const storeImageRef = useRef<HTMLInputElement>(null);
  const storeDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const [storeNameErr, setStoreNameErr] = useState("");
  const [address2Err, setAddress2Err] = useState("");
  const [basePayErr, setBasePayErr] = useState("");
  const [workType, setWorkType] = useState<any>(category);
  const [mainAddress, setMainAddress] = useState<any>(address1);
  const [imagePath, setImagePath] = useState(imageUrl);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    const storeImage = storeImageRef.current!.files![0] || imageUrl;

    if (
      storeName === "" ||
      basePay === "" ||
      address2 === "" ||
      storeImage === null ||
      workType === "" ||
      mainAddress === ""
    ) {
      handleInputBlur(storeNameRef, setStoreNameErr);
      handleInputBlur(basePayRef, setBasePayErr);
      handleInputBlur(address2Ref, setAddress2Err);
      return;
    }

    const createdImageUrl = await createImageApiResponse({
      name: getCookie("uid")!,
    });

    const image: string = isImageChanged
      ? (await putFileFetch(createdImageUrl.item.url, storeImage)).url.split(
          "?",
        )[0]
      : imageUrl;

    await editShopInformationApiResponse(id, {
      name: storeName,
      category: workType,
      address1: address1,
      address2: address2,
      description: storeDescription,
      imageUrl: image,
      originalHourlyPay: Number(basePay),
    });

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/user/employer");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <div className="grid w-full grid-cols-2 gap-x-5 gap-y-6 mob:grid-cols-1">
        <Input
          inputRef={storeNameRef}
          errorType={storeNameErr}
          inputType="STORE_NAME"
          blurEvent={() => handleInputBlur(storeNameRef, setStoreNameErr)}
          defaultValue={name}
        />
        <Input
          inputType="WORK_TYPES"
          selectData={setWorkType}
          defaultValue={category}
        />
        <Input
          inputType="MAIN_ADDRESS"
          selectData={setMainAddress}
          defaultValue={address1}
        />
        <Input
          inputRef={address2Ref}
          errorType={address2Err}
          inputType="ADDRESS"
          blurEvent={() => handleInputBlur(address2Ref, setAddress2Err)}
          defaultValue={address2}
        />
        <Input
          inputRef={basePayRef}
          errorType={basePayErr}
          inputType="BASE_WAGE"
          blurEvent={() => handleInputBlur(basePayRef, setBasePayErr)}
          defaultValue={originalHourlyPay}
        />
      </div>

      <div>
        <p className="body1 mb-2">가게 이미지</p>
        <label className="relative block h-[276px] w-[483px] mob:h-[200px] mob:w-full mob:max-w-[351px]">
          <Image
            className="object-cover"
            src={`${imagePath ? imagePath : imageUrl}`}
            alt="store-preview"
            fill
          />
          <input
            ref={storeImageRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={() => {
              setIsImageChanged(true);
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
          className="body1 h-40 w-full resize-none overflow-y-scroll border-[1px] border-gray-30 px-5 py-4 focus:border-primary focus:outline-none"
          defaultValue={description}
        />
      </div>
      <div className="mt-2 flex w-full justify-center">
        <Button size="large" type="submit" color="red">
          수정하기
        </Button>
      </div>
      {showModal && (
        <Modal onClose={() => handleModalClose()}>
          <div className="mt-5">
            <p className="mb-10">수정이 완료되었습니다</p>
            <div className="absolute min-w-40">
              <Button
                onClick={() => handleModalClose()}
                size="full"
                color="red"
              >
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </form>
  );
};

export default StoreEditForm;

"use client";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Address, mydataApiResponse, mydataEditApiResponse } from "@/util/api";
import { getCookie } from "@/util/cookieSetting";
import { UserItem } from "@/util/constants/PROFILE_PAGE_USER_TEST_DATA";
import {
  INPUT_SELECT_DATA_LIST,
  INPUT_SELECT_TYPE,
} from "@/util/constants/INPUT_VALUES";
import { formatPhoneNumber } from "@/util/formatPhoneNumber";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Image from "next/image";
import closeIcon from "/public/close.svg";
import ModalPortal from "@/components/common/ModalPortal";

const SUCCESS_MODAL_MESSAGE = "등록이 완료되었습니다.";

const RegisterProfile = () => {
  const [userData, setUserData] = useState<UserItem | null>(null);
  const [isProfileData, setIsProfileData] = useState(true);
  const [addressValue, setAddressValue] = useState(userData?.address);
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(SUCCESS_MODAL_MESSAGE);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneNumRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const userId = getCookie("uid");

  async function getUserData(userId: string | undefined) {
    if (!userId) return;
    const { item } = await mydataApiResponse(userId);
    return item;
  }

  useEffect(() => {
    if (!userId) router.push("/signin");
    const fetchUserData = async () => {
      const data = await getUserData(userId);
      setUserData(data);
      if (data && Object.keys(data).length <= 4) {
        setIsProfileData(false);
      }
      setIsProfileData(true);
    };
    fetchUserData();
  }, [userId, router]);

  const handleClick = () => {
    router.push("/user/employee");
  };

  const checkNameValid = () => {
    if (!nameRef.current?.value) return setNameErr("BLANK_REQUIRE_VALUE");
    return setNameErr("");
  };

  const checkPhoneNumValid = () => {
    if (!phoneNumRef.current) return setPhoneErr("INVALID_PHONE_NUMBER");

    const phoneNum = phoneNumRef.current.value.replace(/\D/g, "");
    return phoneNum.length < 10 || phoneNum.slice(0, 3) !== "010"
      ? setPhoneErr("INVALID_PHONE_NUMBER")
      : setPhoneErr("");
  };

  //phoneNum의 포커스가 사라질 때, 자동으로 '-'을 넣어주는 함수.
  const handlePhoneBlur = (target: string | undefined) => {
    if (!target) return setPhoneErr("BLANK_REQUIRE_VALUE");

    checkPhoneNumValid();

    if (phoneNumRef.current && phoneErr === "") {
      phoneNumRef.current.value = formatPhoneNumber(target.replace(/\D/g, ""));
    }
  };

  const handleSelect = (data: string) => {
    setAddressValue(data);
  };

  const handleSubmit = async () => {
    if (!phoneErr && !nameErr) {
      const editValue = {
        name: nameRef.current?.value ?? "",
        phone: formatPhoneNumber(phoneNumRef.current?.value ?? ""),
        address: (addressValue as Address) ?? userData?.address,
        bio: bioRef.current?.value ?? "",
      };

      const res = await mydataEditApiResponse(editValue);
      if (!res.message) {
        setModalMessage(SUCCESS_MODAL_MESSAGE);
      } else {
        setModalMessage(res.message);
      }
      setShowModal(true);
    }
  };

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    setShowModal(false);
  };

  const handleCheckClick = () => {
    setShowModal(false);
    if (modalMessage === SUCCESS_MODAL_MESSAGE) router.push("/user/employee");
    return;
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-170px)] flex-col items-center gap-8 bg-gray-5 py-[60px] tab:-mx-8 tab:pb-[278px] mob:-mx-3 mob:pb-20">
        <div className="flex w-[964px] justify-between tab:w-[632px] mob:w-[350px]">
          <h1 className="h1 mob:h3">내 프로필</h1>
          <button type="button" onClick={handleClick}>
            <Image src={closeIcon} className="w-8 mob:w-6" alt="closeBtn" />
          </button>
        </div>
        <form className="grid w-[964px] grid-cols-3 gap-5 tab:w-[632px] tab:grid-cols-2 mob:w-[350px] mob:grid-cols-1">
          <div>
            <Input
              inputType="NAME"
              inputRef={nameRef}
              errorType={nameErr}
              blurEvent={() => checkNameValid()}
              defaultValue={userData?.name}
              maxLength={15}
            />
          </div>
          <div>
            <Input
              inputType="PHONE_NUMBER"
              inputRef={phoneNumRef}
              errorType={phoneErr}
              blurEvent={() => handlePhoneBlur(phoneNumRef.current?.value)}
              defaultValue={userData?.phone?.replace(/\D/g, "")}
              maxLength={11}
            />
          </div>
          <div>
            <Input
              inputType={INPUT_SELECT_TYPE[2]}
              dataArray={INPUT_SELECT_DATA_LIST.MAIN_ADDRESS}
              selectData={handleSelect}
              defaultValue={userData?.address}
            />
          </div>
          <div className="col-span-3 flex flex-col gap-2 tab:col-span-2 mob:col-span-1">
            <label>소개</label>
            <textarea
              className="h-40 w-full resize-none rounded-lg border border-gray-30 px-5 py-4 focus:border-primary focus:outline-none"
              placeholder="자기 소개를 입력해 주세요."
              maxLength={300}
              ref={bioRef}
              defaultValue={userData?.bio}
            />
          </div>
        </form>
        <Button
          type="submit"
          size="large"
          color={phoneErr || nameErr ? "gray" : "red"}
          onClick={handleSubmit}
        >
          {isProfileData ? "수정하기" : "등록하기"}
        </Button>
      </div>
      {showModal && (
        <ModalPortal>
          <Modal
            onClose={handleOutsideClick}
            iconStatus={
              modalMessage === SUCCESS_MODAL_MESSAGE ? "success" : "warning"
            }
            className="relative gap-3 mob:max-h-[220px] mob:max-w-[327px]"
          >
            <div className="flex flex-col gap-8">
              <p className="text-center text-lg font-normal">{modalMessage}</p>
              <Button
                color="red"
                size="small"
                onClick={handleCheckClick}
                className="absolute bottom-[28px] right-[28px] h-[38px]"
              >
                확인
              </Button>
            </div>
          </Modal>
        </ModalPortal>
      )}
    </>
  );
};

export default RegisterProfile;

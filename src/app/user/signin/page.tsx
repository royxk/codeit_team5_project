"use client";

import React, { FormEvent, useState } from "react";
import Button from "@/components/common/Button";
import Link from "next/link";
import { mydataApiResponse, signinApiResponse } from "@/util/api";
import {
  getCookie,
  setAccessTokenCookie,
  setShopIdCookie,
  setUserIdCookie,
} from "@/util/cookieSetting";
import Image from "next/image";
import EmailInput from "@/components/signin/EmailInput";
import PasswordInput from "@/components/signin/PasswordInput";
import Modal from "@/components/common/SignModal";
import ModalPortal from "@/components/common/ModalPortal";
import { useRouter } from "next/navigation";

interface ModalProps {
  onClose: () => void;
}

const Signin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [uid, setUid] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (email.trim() && password.trim() && !emailError && !passwordError) {
      try {
        const { item } = await signinApiResponse({ email, password });

        if (!item) {
          setModalMessage("비밀번호가 일치하지 않습니다.");
          setShowModal(true);
          return;
        }

        console.log(item);
        const userId = item.user.item.id;
        const userAccessToken = item.token;
        const userType = item.user.item.type;

        if (userType === "employer") {
          const { item } = await mydataApiResponse(userId);
          if (item.type === "employer") {
            if (item.shop === null) {
              setShopIdCookie("");
            } else {
              const { id: shopId } = item.shop.item;
              setShopIdCookie(shopId);
            }
          }
        }

        setAccessTokenCookie(userAccessToken);
        setUserIdCookie(userId);

        setAccessToken(item.token);
        setUid(userId);

        console.log(`accessCookie: ${getCookie("accessToken")}`);
        console.log(`userIdCookie: ${getCookie("uid")}`);

        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
        router.push("./");
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    } else {
      if (!email.trim()) setEmailError("이메일 형식이 올바르지 않습니다.");
      if (!password.trim()) setPasswordError("8자 이상 입력해주세요.");
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center pb-[300px]">
      <div className="flex h-[288px] w-[350px] flex-col">
        <div className="m-10 flex items-center justify-center">
          <Link href={"/"}>
            <Image
              src="/signin/logoIcon.png"
              alt="logoIcon"
              width={248}
              height={45}
            />
          </Link>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-5 flex flex-col ">
            <EmailInput
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              setEmailError={setEmailError}
            />
            <PasswordInput
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
          </div>
          <div className="mb-5 flex h-[48px] w-[350px] items-center justify-center">
            <Button
              type="submit"
              size="large"
              color="red"
              onClick={(e) => handleSubmit(e)}
            >
              로그인 하기
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center font-Pretendard text-sm font-normal">
          <span className="mr-3">회원이 아니신가요?</span>{" "}
          <Link
            href="./signup"
            className="text-[#5534Da]"
            style={{ textDecoration: "underline" }}
          >
            회원가입하기
          </Link>
        </div>
      </div>
      {showModal && (
        <ModalPortal>
          <Modal type="bad" onClose={() => setShowModal(false)}>
            <div className="text-center">
              <p className="mt-7">{modalMessage}</p>
              <Button
                color="red"
                size="small"
                onClick={() => setShowModal(false)}
                className="relative left-[140px] top-[50px] h-[40px] w-[100px] text-[16px] font-[400]"
              >
                확인
              </Button>
            </div>
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
};

export default Signin;

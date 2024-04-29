"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { logout, mydataApiResponse, signinApiResponse } from "@/util/api";
import {
  setAccessTokenCookie,
  setShopIdCookie,
  setUserIdCookie,
} from "@/util/cookieSetting";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/signin/LoginForm";
import ErrorModal from "@/components/signin/ErrorModal";

const constant = {
  MODAL_BUTTON_TEXT: "확인",
  EMAIL_ERROR_MESSAGE: "이메일 형식이 올바르지 않습니다.",
  PASSWORD_ERROR_MESSAGE: "8자 이상 입력해주세요.",
  LOGO_ICON_SRC: "/signin/logoIcon.svg",
  MODAL_MESSAGE: "비밀번호가 일치하지 않습니다.",
};

const Signin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() && password.trim() && !emailError && !passwordError) {
      try {
        const { item } = await signinApiResponse({ email, password });

        if (!item) {
          setModalMessage(constant.MODAL_MESSAGE);
          setShowModal(true);
          return;
        }

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

        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
        router.push("/");
      } catch (error) {
        setModalMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        setShowModal(true);
      }
    } else {
      setEmailError(email.trim() ? "" : constant.EMAIL_ERROR_MESSAGE);
      setPasswordError(password.trim() ? "" : constant.PASSWORD_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="relative flex h-screen items-center justify-center pb-[300px]">
      <div className="flex h-[288px] w-[350px] flex-col">
        <div className="m-10 flex items-center justify-center">
          <Link href={"/"}>
            <Image
              src={constant.LOGO_ICON_SRC}
              alt="로고 아이콘"
              width={360}
              height={80}
            />
          </Link>
        </div>
        <LoginForm
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          setEmailError={setEmailError}
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          onSubmit={handleSubmit}
        />
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
        <ErrorModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalMessage={modalMessage}
        />
      </div>
    </div>
  );
};

export default Signin;

"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import Link from "next/link";
import { signinApiResponse } from "@/util/api";
import { setAccessTokenCookie, setUserIdCookie } from "@/util/cookieSetting";
import Image from "next/image";
import EmailInput from "@/components/signin/EmailInput";
import PasswordInput from "@/components/signin/PasswordInput";
import Modal from "@/components/common/SignModal";

function getCookieValue(cookieName: string): string | undefined {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(`${cookieName}=`.length);
    }
  }
  return undefined;
}

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [uid, setUid] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() && password.trim() && !emailError && !passwordError) {
      try {
        const { item } = await signinApiResponse({ email, password });

        if (!item) {
          setModalMessage("비밀번호가 일치하지 않습니다.");
          setShowModal(true);
          return;
        }
        const userId = item.user.item.id;
        const userAccessToken = item.token;

        setAccessTokenCookie(userAccessToken);
        setUserIdCookie(userId);

        setAccessToken(item.token);
        setUid(userId);

        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
        window.location.href = "/";
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    } else {
      if (!email.trim()) setEmailError("이메일 형식이 올바르지 않습니다.");
      if (!password.trim()) setPasswordError("8자 이상 입력해주세요.");
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (showModal) {
        setShowModal(false);
      } else {
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton instanceof HTMLButtonElement) {
          submitButton.click();
        }
      }
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center pb-[300px]">
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleEnterPress}
        className="flex h-[288px] w-[350px] flex-col"
      >
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
          <Button type="submit" size="large" color="red">
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
        {showModal && (
          <Modal type="bad" onClose={() => setShowModal(false)}>
            <div className="text-center">
              <p className="mt-7">{modalMessage}</p>
              <Button
                color="red"
                size="small"
                onClick={() => setShowModal(false)}
                className="relative left-[140px] top-[50px] h-[40px] w-[100px] text-[16px] font-[400]"
                type="submit"
              >
                확인
              </Button>
            </div>
          </Modal>
        )}
      </form>
    </div>
  );
};

export default Signin;

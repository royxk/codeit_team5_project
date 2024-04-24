"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import EmailInput from "@/components/signin/EmailInput";
import PasswordInput from "@/components/signin/PasswordInput";
import Link from "next/link";
import { signinApiResponse } from "@/util/api";
import { setAccessTokenCookie, setUserIdCookie } from "@/util/cookieSetting";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async () => {
    // Check if email and password are not empty
    if (!email.trim()) {
      setEmailError("이메일을 입력하세요.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력하세요.");
      return;
    }

    try {
      const { item } = await signinApiResponse({ email, password });

      if (!item) {
        setEmailError("이메일이 올바르지 않습니다.");
        setPasswordError("비밀번호가 올바르지 않습니다.");
        return;
      }

      const userId = item.user.item.id;
      setAccessTokenCookie(item.token);
      setUserIdCookie(userId);

      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center pb-[300px]">
      <div className="flex h-[288px] w-[350px] flex-col">
        <div className="m-10 flex items-center justify-center">
          <img
            src="/signin/logoIcon.png"
            alt="logoIcon"
            className="h-[45px] w-[248px]"
          />
        </div>
        <div className="mb-5 flex flex-col">
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
          <Button size="large" color="red" onClick={handleSubmit}>
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

export default Signin;

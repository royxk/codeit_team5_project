"use client";

import React, { useRef, useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Link from "next/link";

const Signup = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (index: number) => {
    setSelectedButtonIndex(index);
  };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("이메일 형식으로 작성해 주세요");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("8자 이상 작성해 주세요");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      console.log("회원가입 성공");
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
          <div className="mb-6 flex flex-col">
            <span className="mb-1">이메일</span>
            <Input
              inputType="email"
              inputRef={emailRef}
              errorType={emailError ? "ERROR" : ""}
              blurEvent={() => validateEmail()}
            />
            {emailError && <p className="text-red-400">{emailError}</p>}
          </div>
          <div className="mb-6 flex flex-col">
            <span className="mb-1">비밀번호</span>
            <Input
              inputType="password"
              inputRef={passwordRef}
              errorType={passwordError ? "ERROR" : ""}
              blurEvent={() => validatePassword()}
            />
            {passwordError && <p className="text-red-400">{passwordError}</p>}
          </div>
          <div className="mb-6 flex flex-col">
            <span className="mb-1">비밀번호 확인</span>
            <Input
              inputType="password"
              inputRef={confirmPasswordRef}
              errorType={confirmPasswordError ? "ERROR" : ""}
              blurEvent={() => validateConfirmPassword()}
            />
            {confirmPasswordError && (
              <p className="text-red-400">{confirmPasswordError}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="mb-1">회원 유형</span>
          <div className="mb-6  flex justify-between gap-[8px]">
            <button
              type="button"
              className={`flex h-[50px] w-[167px] items-center rounded-[30px] border px-[41px] py-[13px] ${
                selectedButtonIndex === 0 ? "border-primary" : "border-gray-30"
              }`}
              onClick={() => handleButtonClick(0)}
            >
              <img
                src={
                  selectedButtonIndex === 0
                    ? "/signup/circleCheckIcon.png"
                    : "/signup/grayCircleIcon.png"
                }
                alt="circleIcon"
                className="relative left-[-4px] top-[1px] mr-2 h-5 w-5"
              />
              알바님
            </button>
            <button
              type="button"
              className={`flex h-[50px] w-[167px] items-center rounded-[30px] border px-[41px] py-[13px] ${
                selectedButtonIndex === 1 ? "border-primary" : "border-gray-30"
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <img
                src={
                  selectedButtonIndex === 1
                    ? "/signup/circleCheckIcon.png"
                    : "/signup/grayCircleIcon.png"
                }
                alt="circleIcon"
                className="relative left-[-4px] top-[1px] mr-2 h-5 w-5"
              />
              사장님
            </button>
          </div>
        </div>
        <div className="mb-5 flex h-[48px] w-[350px] items-center justify-center">
          <Button
            size="large"
            color="red"
            className="w-[350px] border border-primary"
            onClick={() => handleSubmit()}
          >
            가입하기
          </Button>
        </div>
        <div className="flex items-center justify-center font-Pretendard text-sm font-normal">
          <span className="mr-3">이미 가입하셨나요?</span>{" "}
          <Link
            href="/signin"
            className="text-[#5534Da]"
            style={{ textDecoration: "underline" }}
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

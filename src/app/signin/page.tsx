"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import EmailInput from "@/components/signin/EmailInput";
import PasswordInput from "@/components/signin/PasswordInput";
import Link from "next/link";
import { signinApiResponse } from "@/util/api";
import { setAccessTokenCookie, setUserIdCookie } from "@/util/cookieSetting";

import Modal from "@/components/signin/Modal";

interface ModalProps {
  onClose: () => void;
}

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (email.trim() && password.trim() && !emailError && !passwordError) {
      try {
        const { item } = await signinApiResponse({ email, password });

        if (!item) {
          setModalMessage("비밀번호가 일치하지 않습니다.");
          setShowModal(true);
          return;
        }

        const userId = item.user.item.id;
        setAccessTokenCookie(item.token);
        setUserIdCookie(userId);

        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
        setModalMessage("로그인에 성공했습니다.");
        setShowModal(true);
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
          <img
            src="/signin/logoIcon.png"
            alt="logoIcon"
            className="h-[45px] w-[248px]"
          />
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
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="text-center">
            <p className="mt-7">{modalMessage}</p>
            <Button
              color="red"
              size="small"
              onClick={() => setShowModal(false)}
              className="relative top-[50px] h-[48px] w-[120px] sm:left-[180px]"
            >
              확인
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Signin;

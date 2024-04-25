"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import EmailInput from "@/components/signup/EmailInput";
import PasswordInput from "@/components/signup/PasswordInput";
import ConfirmPasswordInput from "@/components/signup/ConfirmPasswordInput";
import Link from "next/link";
import { signupApiResponse } from "@/util/api";
import { setAccessTokenCookie, setUserIdCookie } from "@/util/cookieSetting";

import Modal from "@/components/signup/Modal";

interface ModalProps {
  onClose: () => void;
}

enum UserType {
  Employee = "employee",
  Employer = "employer",
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null,
  );
  const [userType, setUserType] = useState<string>("employee");

  const handleButtonClick = (index: number) => {
    setSelectedButtonIndex(index);
    index === 0 ? setUserType("employee") : setUserType("employer");
  };

  const handleSubmit = async () => {
    if (
      email.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      password.trim() === confirmPassword.trim()
    ) {
      try {
        if (selectedButtonIndex === null) {
          setModalMessage("회원 유형을 선택해주세요");
          setShowModal(true);
          return;
        }

        const { item } = await signupApiResponse({
          email,
          password,
          type: userType as UserType,
        });

        if (!item) {
          setModalMessage("아직은 회원가입이 불가능합니다.");
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
        setConfirmPassword("");
        setConfirmPasswordError("");
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    } else {
      if (!email.trim()) setEmailError("이메일을 입력하세요.");
      if (!password.trim()) setPasswordError("비밀번호를 입력하세요.");
      if (!confirmPassword.trim())
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      if (password.trim() !== confirmPassword.trim())
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
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
        <div className="mb-2 flex flex-col ">
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
          <ConfirmPasswordInput
            password={password}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            confirmPasswordError={confirmPasswordError}
            setConfirmPasswordError={setConfirmPasswordError}
          />
        </div>
        <div className="flex flex-col">
          <div>
            <span className="mb-1">회원 유형</span>
          </div>
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
            onClick={handleSubmit}
            className="w-[350px] border border-primary"
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

export default Signup;

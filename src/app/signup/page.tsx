"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import EmailInput from "@/components/signup/EmailInput";
import PasswordInput from "@/components/signup/PasswordInput";
import ConfirmPasswordInput from "@/components/signup/ConfirmPasswordInput";
import Link from "next/link";
import { signupApiResponse } from "@/util/api";
import Modal from "@/components/common/SignModal";
import Image from "next/image";

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
  const [confirmShowModal, setConfirmShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [userType, setUserType] = useState<UserType>(UserType.Employee);

  const handleButtonClick = (userType: UserType) => {
    setUserType(userType);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setEmailError("이메일을 입력하세요.");
      return;
    }
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력하세요.");
      return;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("비밀번호를 확인하세요.");
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    // if (userType === null) {
    //   setModalMessage("회원 유형을 선택해주세요");
    //   setShowModal(true);
    //   return;
    // }

    try {
      console.log(email.trim(), password.trim(), userType);
      const { item, message } = await signupApiResponse({
        email: email.trim() as string,
        password: password.trim() as string,
        type: userType,
      });

      if (message) {
        console.log(message);
        if (message === "이미 존재하는 이메일입니다.") {
          setEmail("");
          setEmailError("");
          setModalMessage(message);
          setShowModal(true);
          return;
        } else if (message === "올바른 이메일이 아닙니다.") {
          setEmail("");
          setEmailError("");
          setModalMessage(message);
          setShowModal(true);
          return;
        }
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      console.log("회원가입 응답:", item);
      setModalMessage("회원가입이 완료되었습니다.");
      setConfirmShowModal(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
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
          <span className="mb-3">회원 유형</span>
          <div className="mb-6  flex justify-between gap-[8px]">
            <button
              type="button"
              className={`flex h-[50px] w-[167px] items-center rounded-[30px] border px-[41px] py-[13px] ${
                userType === UserType.Employee
                  ? "border-primary"
                  : "border-gray-30"
              }`}
              onClick={() => handleButtonClick(UserType.Employee)}
            >
              <Image
                src={
                  userType === UserType.Employee
                    ? "/signup/circleCheckIcon.png"
                    : "/signup/grayCircleIcon.png"
                }
                alt="circleIcon"
                width={20}
                height={20}
                className="relative left-[-4px] top-[1px] mr-2"
              />
              알바님
            </button>
            <button
              type="button"
              className={`flex h-[50px] w-[167px] items-center rounded-[30px] border px-[41px] py-[13px] ${
                userType === UserType.Employer
                  ? "border-primary"
                  : "border-gray-30"
              }`}
              onClick={() => handleButtonClick(UserType.Employer)}
            >
              <Image
                src={
                  userType === UserType.Employer
                    ? "/signup/circleCheckIcon.png"
                    : "/signup/grayCircleIcon.png"
                }
                alt="circleIcon"
                width={20}
                height={20}
                className="relative left-[-4px] top-[1px] mr-2"
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
              className="relative left-[180px] top-[50px] h-[48px] w-[120px]"
            >
              확인
            </Button>
          </div>
        </Modal>
      )}
      {confirmShowModal && (
        <Modal onClose={() => setConfirmShowModal(false)}>
          <div className="text-center">
            <p className="mt-7">{modalMessage}</p>
            <Button
              color="red"
              size="small"
              onClick={() => {
                setConfirmShowModal(false);
                window.location.href = "/signin";
              }}
              className="relative left-[180px] top-[50px] h-[48px] w-[120px]"
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

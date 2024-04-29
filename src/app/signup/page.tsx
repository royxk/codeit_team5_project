"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import Link from "next/link";
import { signupApiResponse } from "@/util/api";
import Image from "next/image";
import EmailInput from "@/components/signup/EmailInput";
import PasswordInput from "@/components/signup/PasswordInput";
import ConfirmPasswordInput from "@/components/signup/ConfirmPasswordInput";
import Modal from "@/components/common/Modal";
import ModalPortal from "@/components/common/ModalPortal";
import { useRouter } from "next/navigation";

enum UserType {
  Employee = "employee",
  Employer = "employer",
}

const constant = {
  MODAL_BUTTON_TEXT: "확인",
  EMAIL_ERROR_MESSAGE: "이메일을 입력하세요.",
  PASSWORD_ERROR_MESSAGE: "비밀번호를 입력하세요.",
  CONFIRM_PASSWORD_ERROR_MESSAGE: "비밀번호를 확인하세요.",
  PASSWORD_MISMATCH_ERROR_MESSAGE: "비밀번호가 일치하지 않습니다.",
  SIGNUP_SUCCESS_MESSAGE: "회원가입이 완료되었습니다.",
  EMAIL_EXIST_ERROR_MESSAGE: "이미 존재하는 이메일입니다.",
  INVALID_EMAIL_ERROR_MESSAGE: "올바른 이메일이 아닙니다.",
};

const Signup: React.FC = () => {
  const router = useRouter();
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError(constant.EMAIL_ERROR_MESSAGE);
      return;
    }
    if (!password.trim()) {
      setPasswordError(constant.PASSWORD_ERROR_MESSAGE);
      return;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(constant.CONFIRM_PASSWORD_ERROR_MESSAGE);
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError(constant.PASSWORD_MISMATCH_ERROR_MESSAGE);
      return;
    }

    try {
      const { message } = await signupApiResponse({
        email: email.trim() as string,
        password: password.trim() as string,
        type: userType,
      });

      if (message) {
        if (
          message === constant.EMAIL_EXIST_ERROR_MESSAGE ||
          message === constant.INVALID_EMAIL_ERROR_MESSAGE
        ) {
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
      setModalMessage(constant.SIGNUP_SUCCESS_MESSAGE);
      setConfirmShowModal(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (showModal || confirmShowModal) {
      if (e.key === "Enter") {
        e.preventDefault();
        showModal ? setShowModal(false) : setConfirmShowModal(false);
      }
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center pb-[300px]">
      <div className="flex h-[288px] w-[350px] flex-col">
        <div className="m-10 mt-[-50px] flex items-center justify-center">
          <Link href={"/"}>
            <Image
              src="/signin/logoIcon.svg"
              alt="logoIcon"
              width={360}
              height={80}
            />
          </Link>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} onKeyDown={handleEnterPress}>
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
              type="submit"
              size="large"
              color="red"
              onClick={(e) => handleSubmit(e)}
              className="w-[350px] border border-primary"
            >
              가입하기
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center font-Pretendard text-sm font-normal">
          <span className="mr-3">이미 가입하셨나요?</span>{" "}
          <Link
            href="./signin"
            className="text-[#5534Da]"
            style={{ textDecoration: "underline" }}
          >
            로그인하기
          </Link>
        </div>
      </div>
      {showModal && (
        <ModalPortal>
          <Modal iconStatus="warning" onClose={() => setShowModal(false)}>
            <div className="text-center">
              <p className="mt-7">{modalMessage}</p>
              <Button
                color="red"
                size="small"
                onClick={() => setShowModal(false)}
                className="relative left-[140px] top-[50px] h-[40px] w-[100px] text-[13px] font-[400]"
              >
                {constant.MODAL_BUTTON_TEXT}
              </Button>
            </div>
          </Modal>
        </ModalPortal>
      )}
      {confirmShowModal && (
        <ModalPortal>
          <Modal
            iconStatus="success"
            onClose={() => setConfirmShowModal(false)}
          >
            <div className="text-center">
              <p className="mt-7">{modalMessage}</p>
              <Button
                color="red"
                size="small"
                onClick={() => {
                  setConfirmShowModal(false);
                  router.push("/signin");
                }}
                className="relative left-[140px] top-[50px] h-[40px] w-[100px] text-[13px] font-[400]"
              >
                {constant.MODAL_BUTTON_TEXT}
              </Button>
            </div>
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
};

export default Signup;

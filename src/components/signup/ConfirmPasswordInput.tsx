"use client";

import React, { useState } from "react";
import Input from "@/components/signup/Input";

interface ConfirmPasswordInputProps {
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPasswordError: string;
  setConfirmPasswordError: React.Dispatch<React.SetStateAction<string>>;
  password: string;
}

const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  confirmPassword,
  setConfirmPassword,
  confirmPasswordError,
  setConfirmPasswordError,
  password,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const validatePassword = (input: string) => {
    if (input !== password) {
      setConfirmPasswordError("비밀번호가 다릅니다.");
    } else if (input.length < 8) {
      setConfirmPasswordError("8자 이상 입력해주세요.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setConfirmPassword(inputValue);
    validatePassword(inputValue);
  };

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
    validatePassword(confirmPassword);
  };

  return (
    <div className="mb-4 flex flex-col">
      <span className="z-0 mb-1">비밀번호 확인</span>
      <Input
        inputType="password"
        value={confirmPassword}
        errorType={!isTyping && confirmPasswordError ? "ERROR" : ""}
        onChange={handlePasswordChange}
        blurEvent={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder="입력"
      />
      {!isTyping && confirmPasswordError && (
        <p className="text-red-400">{confirmPasswordError}</p>
      )}
    </div>
  );
};

export default ConfirmPasswordInput;

"use client";

import React, { useState } from "react";
import Input from "@/components/common/SignInput";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordError: string;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  passwordError,
  setPasswordError,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validatePassword = (input: string) => {
    if (input.length < 8) {
      setPasswordError("8자 이상 입력해주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
    validatePassword(inputValue);
  };

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
    validatePassword(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative mb-4 flex flex-col">
      <span className="z-0 mb-1">비밀번호</span>
      <Input
        inputType={showPassword ? "text" : "password"}
        value={password}
        errorType={!isTyping && passwordError ? "ERROR" : ""}
        onChange={handlePasswordChange}
        blurEvent={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder="입력"
      />
      <p className="h-2 pb-3 pt-1 text-red-400">
        {!isTyping && passwordError && passwordError}
      </p>
      <button
        type="button"
        className="absolute right-0 top-0 mr-2 mt-1 cursor-pointer text-sm text-gray-500"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? "비밀번호 숨기기" : "비밀번호 표시하기"}
      </button>
    </div>
  );
};

export default PasswordInput;

"use client";

import React, { useState } from "react";
import Input from "@/components/signin/Input";

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

  return (
    <div className="mb-4 flex flex-col">
      <span className="mb-1">비밀번호</span>
      <Input
        inputType="password"
        value={password}
        errorType={!isTyping && passwordError ? "ERROR" : ""}
        onChange={handlePasswordChange}
        blurEvent={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder="입력"
      />
      {!isTyping && passwordError && (
        <p className="text-red-400">{passwordError}</p>
      )}
    </div>
  );
};

export default PasswordInput;

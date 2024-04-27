"use client";

import React, { useState } from "react";
import Input from "@/components/common/SignInput";

interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  emailError,
  setEmailError,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const validateEmail = (input: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(input)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    validateEmail(inputValue);
  };

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
    validateEmail(email);
  };

  return (
    <div className="mb-6 flex flex-col">
      <span className="z-0 mb-1">이메일</span>
      <Input
        inputType="email"
        errorType={!isTyping && emailError ? "ERROR" : ""}
        value={email}
        onChange={handleEmailChange}
        blurEvent={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder="입력"
      />
      <p className="h-2 pt-1 text-red-400">
        {!isTyping && emailError && emailError}
      </p>
    </div>
  );
};

export default EmailInput;

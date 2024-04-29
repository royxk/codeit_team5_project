"use client";

import React from "react";
import EmailInput from "@/components/signin/EmailInput";
import PasswordInput from "@/components/signin/PasswordInput";
import Button from "@/components/common/Button";

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordError: string;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  emailError,
  setEmailError,
  password,
  setPassword,
  passwordError,
  setPasswordError,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
        <Button type="submit" size="large" color="red">
          로그인 하기
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

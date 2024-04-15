"use client";
import React from "react";

interface InputProps {
  inputType?: string;
}

const Input = ({ inputType = "default" }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-black" htmlFor={inputType}>
        테스트 라벨
      </label>
      <label
        className="relative flex justify-between px-5 py-4 border-[1px] border-gray-30 focus-within:border-blue-20 z-[1] cursor-text bg-white"
        htmlFor={inputType}
      >
        <input
          id={inputType}
          className="w-full focus-visible:outline-none rounded-md"
          type="text"
          onBlur={() => console.log("blurd")}
        />
        <p>{inputType}</p>
      </label>
      <p className="ml-2 text-red-400">에러 메시지</p>
    </div>
  );
};

export default Input;

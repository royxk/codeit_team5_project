"use client";
import {
  INPUT_ERROR_TYPE,
  INPUT_LABELS,
  INPUT_LAST_WORD,
} from "@/util/constants/INPUT_VALUES";
import React from "react";

interface InputProps {
  inputType?: string;
  errorType?: string;
  blurEvent?: () => void;
}

const Input = ({
  inputType = "default",
  errorType = "",
  blurEvent = () => console.log("blured"),
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-black" htmlFor={inputType}>
        {INPUT_LABELS[inputType]}
      </label>
      <label
        className="relative flex justify-between px-5 py-4 border-[1px] border-gray-30 focus-within:border-blue-20 z-[1] cursor-text bg-white"
        htmlFor={inputType}
      >
        <input
          id={inputType}
          className="w-full focus-visible:outline-none rounded-md"
          type="text"
          onBlur={blurEvent}
        />
        {INPUT_LAST_WORD[inputType] && (
          <p className="text-nowrap">{INPUT_LAST_WORD[inputType]}</p>
        )}
      </label>
      {INPUT_ERROR_TYPE[errorType] && (
        <p className="ml-2 text-red-400">{INPUT_ERROR_TYPE[errorType]}</p>
      )}
    </div>
  );
};

export default Input;

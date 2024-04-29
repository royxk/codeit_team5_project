"use client";

import React, { useState, RefObject, ChangeEvent, FocusEvent } from "react";

// Contexts
import {
  INPUT_ERROR_TYPE,
  INPUT_LABELS,
  INPUT_LAST_WORD,
} from "@/util/constants/INPUT_VALUES";

interface InputProps {
  inputType: string;
  inputRef?: RefObject<HTMLInputElement>;
  errorType?: string;
  blurEvent?: () => void;
  dataArray?: string[];
  selectData?: (data: string) => void;
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  inputType = "DEFAULT",
  inputRef,
  errorType = "",
  blurEvent = () => {},
  value = "",
  placeholder = "",
  onChange,
  onFocus,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  if (inputType === "DEFAULT") {
    errorType = "DEFAULT";
  }

  return (
    <div className="relative flex w-full flex-col gap-2">
      <label className="text-black" htmlFor={inputType}>
        {INPUT_LABELS[inputType]}
      </label>
      <>
        <label
          className={`relative z-[1] flex justify-between rounded-lg border-[1px] ${
            focused ? "border-primary" : "border-gray-300"
          } px-5 py-4 focus-within:border-primary ${
            inputType !== "date" ? "cursor-text" : ""
          } bg-white`}
          htmlFor={inputType}
        >
          <input
            id={inputType}
            className="w-full rounded-md focus-visible:outline-none"
            type={inputType}
            onBlur={() => {
              setFocused(false);
              blurEvent();
            }}
            onFocus={(e) => {
              setFocused(true);
              onFocus && onFocus(e);
            }}
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {INPUT_LAST_WORD[inputType] && (
            <p className="text-nowrap">{INPUT_LAST_WORD[inputType]}</p>
          )}
        </label>
        {INPUT_ERROR_TYPE[errorType] && (
          <p className="ml-2 text-red-400">{INPUT_ERROR_TYPE[errorType]}</p>
        )}
      </>
    </div>
  );
};

export default Input;

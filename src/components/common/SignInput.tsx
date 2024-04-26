"use client";

import React, { RefObject, ChangeEvent, FocusEvent } from "react";

// Contexts
import {
  INPUT_ERROR_TYPE,
  INPUT_LABELS,
  INPUT_LAST_WORD,
  INPUT_SELECT_DATA_LIST,
  INPUT_SELECT_TYPE,
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
  blurEvent = () => console.log("blured"),
  value = "",
  placeholder = "",
  onChange,
  onFocus,
}) => {
  if (inputType === "DEFAULT") {
    errorType = "DEFAULT";
  }
  const isSelectType = INPUT_SELECT_TYPE.includes(inputType);
  const dataArray = isSelectType ? INPUT_SELECT_DATA_LIST[inputType] : null;

  return (
    <div className="relative flex w-full flex-col gap-2">
      <label className="text-black" htmlFor={inputType}>
        {INPUT_LABELS[inputType]}
      </label>
      <>
        <label
          className={`relative z-[1] flex justify-between rounded-lg border-[1px] border-gray-30 px-5 py-4 focus-within:border-blue-20 
            ${inputType !== "date" ? "cursor-text" : ""} bg-white`}
          htmlFor={inputType}
        >
          <input
            id={inputType}
            className="w-full rounded-md focus-visible:outline-none"
            type={inputType}
            onBlur={() => blurEvent()}
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
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

"use client";
import {
  INPUT_ERROR_TYPE,
  INPUT_LABELS,
  INPUT_LAST_WORD,
  INPUT_PLACEHOLDER,
  INPUT_SELECT_TYPE,
  INPUT_TYPES,
} from "@/util/constants/INPUT_VALUES";
import React, { useState } from "react";

interface InputProps {
  inputType: string;
  errorType?: string;
  blurEvent?: () => void;
  dataArray?: string[];
  selectData?: (data: string) => void;
}

/**
 * @description input 컴포넌트입니다. inputType이나 errorType 값을 받아 그 값에 따른 ui를 보여줍니다. 상세사항은 constant/INPUT_VALUES.ts를 참조해주세요.
 * @param {string} inputType 현재 input 컴포넌트의 입력 유형입니다.
 * @param {string} errorType 현재 입력에서 발생한 errorType을 받습니다.
 * @param {() => void} blurEvent 현재 input에서 blur되었을 때 발생할 이벤트를 받습니다.
 * @param {string[]} dataArray 선택형 input일 경우, 데이터를 받아 처리할 string 배열을 받습니다. 이 param은 임시 지정으로, api상황에 따라 변동될 수 있습니디ㅏ.
 * @param {function} selectData 선택형 input일 경우, 선택하고자 하는 항목을 선택 했을 때, 해당 string을 이용하여 처리할 함수입니다. 마찬가지로 api상황에 따라 param에 변동이 필요할 수 있습니다.
 * @returns
 */
const Input = ({
  inputType = "default",
  errorType = "",
  blurEvent = () => console.log("blured"),
  dataArray = ["asdf", "sdf", "adf", "asf", "asd", "asaf", "afdf"],
  selectData = (item) => {
    console.log(`selectedData : ${item}`);
  },
}: InputProps) => {
  const [isDropDownEnabled, setIsDropDownEnabled] = useState(false);
  const [selectedData, setSelectedData] = useState<string>("");
  if (inputType === "default") {
    errorType = "default";
  }

  return (
    <div className="flex flex-col gap-2 relative w-full">
      <label className="text-black" htmlFor={inputType}>
        {INPUT_LABELS[inputType]}
      </label>

      {INPUT_SELECT_TYPE.includes(inputType) ? (
        ""
      ) : (
        <>
          <label
            className={`relative flex justify-between px-5 py-4 border-[1px] rounded-lg border-gray-30 focus-within:border-blue-20 z-[1] 
            ${inputType !== "date" ? "cursor-text" : ""} bg-white`}
            htmlFor={inputType}
          >
            <input
              id={inputType}
              className="focus-visible:outline-none rounded-md w-full"
              type={INPUT_TYPES[inputType]}
              onBlur={blurEvent}
              placeholder={INPUT_PLACEHOLDER[inputType]}
            />
            {INPUT_LAST_WORD[inputType] && (
              <p className="text-nowrap">{INPUT_LAST_WORD[inputType]}</p>
            )}
          </label>
          {INPUT_ERROR_TYPE[errorType] && (
            <p className="ml-2 text-red-400">{INPUT_ERROR_TYPE[errorType]}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Input;

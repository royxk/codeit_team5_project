"use client";
import React, { RefObject, useState } from "react";
import Image from "next/image";

// Contexts
import {
  INPUT_ERROR_TYPE,
  INPUT_LABELS,
  INPUT_LAST_WORD,
  INPUT_PLACEHOLDER,
  INPUT_SELECT_DATA_LIST,
  INPUT_SELECT_TYPE,
  INPUT_TYPES,
} from "@/util/constants/INPUT_VALUES";

interface InputProps {
  inputType: string;
  inputRef?: RefObject<HTMLInputElement>;
  errorType?: string;
  blurEvent?: () => void;
  dataArray?: string[];
  selectData?: (data: string) => void;
}

/**
 * @description input 컴포넌트입니다. inputType이나 errorType 값을 받아 그 값에 따른 ui를 보여줍니다. 상세사항은 util/constant/INPUT_VALUES.ts를 참조해주세요.
 * @param {string} inputType 현재 input 컴포넌트의 입력 유형입니다.
 * @param {RefObject<HTMLInputElement>} inputRef (input형) 해당 input와 연걸할 refObject입니다.
 * @param {string} errorType (input형) 현재 입력에서 발생한 errorType을 받습니다.
 * @param {() => void} blurEvent (input형) 현재 input에서 blur되었을 때 발생할 이벤트를 받습니다.
 * @param {function} selectData (select형) 선택하고자 하는 항목을 선택 했을 때, 해당 string을 이용하여 처리할 함수입니다. 추후 작업 상황에 따라 변동이 필요할 수 있습니다.
 * @returns
 */
const Input = ({
  inputType = "DEFAULT",
  inputRef,
  errorType = "",
  blurEvent = () => console.log("blured"),
  selectData = (item) => {
    console.log(`selectedData : ${item}`);
  },
}: InputProps) => {
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
  const [selectedData, setSelectedData] = useState<string>("");
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

      {isSelectType ? (
        // 드롭다운형 input코드
        <div className="relative  border-gray-30 ">
          <button
            type="button"
            className={`z-[1] flex w-full justify-between rounded-lg border-[1px] px-5 py-4 text-left ${
              isDropdownEnabled ? "text-gray-50" : "text-black"
            }`}
            onClick={() => {
              setIsDropdownEnabled(!isDropdownEnabled);
            }}
          >
            {selectedData || "값을 선택해주세요."}
            <Image
              width={16}
              height={16}
              alt="Data_Dropdown"
              src={"/dropdown.svg"}
              className={`duration-300 ${
                isDropdownEnabled ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownEnabled && (
            <div className="absolute top-16 max-h-[230px] w-full cursor-default overflow-y-scroll rounded-lg border-[1px] border-gray-30  bg-white text-center">
              <div className="flex flex-col gap-[1px] bg-gray-20">
                {dataArray!.length === 0 ? (
                  <div className="bg-white py-3">데이터가 없습니다.</div>
                ) : (
                  dataArray!.map((item) => (
                    <button
                      type="button"
                      className="bg-white py-3 hover:bg-gray-5"
                      key={item}
                      onClick={() => {
                        setSelectedData(item);
                        setIsDropdownEnabled(false);
                        selectData(item);
                      }}
                    >
                      {item}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        // 일반 input형 코드
        <>
          <label
            className={`relative z-[1] flex justify-between rounded-lg border-[1px] border-gray-30 px-5 py-4 focus-within:border-blue-20 
            ${inputType !== "date" ? "cursor-text" : ""} bg-white`}
            htmlFor={inputType}
          >
            <input
              id={inputType}
              className="w-full rounded-md focus-visible:outline-none"
              type={INPUT_TYPES[inputType]}
              onBlur={() => blurEvent()}
              ref={inputRef}
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

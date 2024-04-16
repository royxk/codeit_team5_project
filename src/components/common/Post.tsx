import React from "react";
import Image from "next/image";
import time from "../../../public/post/time.svg";
import location from "../../../public/post/location.svg";
import testImg from "../../../public/post/testImg.svg";
import arrow from "../../../public/post/arrow.svg";
import arrowTab from "../../../public/post/arrowTab.svg";

//TODO : Mbile responsive size 만들기
//TODO : Data Props 어떻게 받아와서 넘길지 고민해보기
//TODO : 상태관리는 어떻게 하면 좋을지 생각하기

const state = true;

const Post = () => {
  return (
    <div
      className={`flex border flex-col rounded-xl justify-start gap-4 w-80 p-4 tab:p-3 tab:w-48 ${
        state && "hover:border-red-40"
      }`}
    >
      <div className={`relative w-full`}>
        {!state && (
          <div className="absolute inset-0 flex items-center justify-center bg-black opacity-80 rounded-xl">
            <div className="font-Spoqa font-bold text-white p-2 text-center text-3xl tab:text-xl">
              지난 공고
            </div>
          </div>
        )}
        <Image className="rounded-xl" src={testImg} alt="image"></Image>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div
            className={`font-Spoqa font-bold text-xl ${
              state ? "" : "text-gray-30"
            }`}
          >
            도토리식당
          </div>
          <div className={`flex flex-row gap-4 items-start `}>
            <Image
              className={`${state ? "" : "grayscale"}`}
              src={time}
              alt="time"
            />
            <div className="flex flex-row tab:flex-col">
              <div
                className={`text-gray-50 text-sm tab:text-xs ${
                  state ? "" : "text-gray-30"
                }`}
              >
                2023-01-02
              </div>
              <div
                className={`text-gray-50 text-sm tab:text-xs ${
                  state ? "" : "text-gray-30"
                }`}
              >
                15:00~18:00 (4시간)
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <Image
              className={`${state ? "" : "grayscale"}`}
              src={location}
              alt="time"
            />
            <div
              className={`text-gray-50 text-sm ${state ? "" : "text-gray-30"}`}
            >
              서울시 송파구
            </div>
          </div>
        </div>
        <div
          className={`flex flex-row gap-4 justify-center items-center tab:gap-0 tab:flex-col tab:items-start justify-between`}
        >
          <div
            className={`font-Spoqa font-bold text-xl ${
              state ? "" : "text-gray-30"
            }`}
          >
            15,000원
          </div>
          <div
            className={`flex flex-row font-bold text-white tab:bg-white tab:text-red-40 p-3 tab:p-0 tab:font-light rounded-3xl ${
              state ? "bg-red-40" : "tab:text-gray-30 bg-gray-30"
            }`}
          >
            {state ? (
              <div>{`기존 시급보다 100%`}</div>
            ) : (
              <span className={`${state ? "" : "tab:text-gray-30 text-white"}`}>
                <span className="hidden tab:inline text-gray-30">
                  기존 시급보다{" "}
                </span>
                100%
              </span>
            )}
            <Image className={`tab:hidden`} src={arrow} alt="arrow" />
            <Image
              src={arrowTab}
              className={`m-1 w-4 hidden tab:inline ${
                state ? "" : "grayscale"
              }`}
              alt="arrowTab"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

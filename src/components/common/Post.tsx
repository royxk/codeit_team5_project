import React from "react";
import Image from "next/image";
import time from "../../../public/post/time.svg";
import location from "../../../public/post/location.svg";
import arrow from "../../../public/post/arrow.svg";
// import arrowTab from "../../../public/post/arrowTab.svg";

//TODO: Click Event needed
//TODO: Need to get data about "compare hourly pay" from backend

interface PostProps {
  imgUrl: string;
  shopName: string;
  address1: string;
  hourlyPay: number;
  startTime: string;
  startHour: string;
  state: boolean;
  // clickEvent?: () => void;
  // compareHourlyPay?: number;
}

const Post = ({ imgUrl, shopName, address1, hourlyPay, startTime, startHour, state } : PostProps) : React.ReactElement => {
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
        <img className="rounded-xl" src={imgUrl} alt="image"></img>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div
            className={`font-Spoqa font-bold text-xl ${
              state ? "" : "text-gray-30"
            }`}
          >
            {shopName}
          </div>
          <div className={`flex flex-row gap-4 items-start `}>
            <Image
              className={`${state ? "" : "grayscale"}`}
              src={time}
              alt="time"
            />
            <div className="flex flex-row tab:flex-col tab:gap-0 gap-4">
              <div
                className={`text-gray-50 text-sm tab:text-xs ${
                  state ? "" : "text-gray-30"
                }`}
              >
                {startTime}
              </div>
              <div
                className={`text-gray-50 text-sm tab:text-xs ${
                  state ? "" : "text-gray-30"
                }`}
              >
               {startHour}
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
              {address1}
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
            {hourlyPay.toLocaleString()}원
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
              src={arrow}
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

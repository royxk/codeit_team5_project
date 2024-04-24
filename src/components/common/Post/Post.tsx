import React from "react";
import Image from "next/image";
import SvgTimeComponent from "./SvgTimeComponent";
import SvgLocationComponent from "./SvgLocationComponent";
import SvgArrowComponent from "./SvgArrowComponent";
import Tooltip from "./Tooltip";

//TODO: 회색 텍스트 같이 만들기
//TODO:

interface PostProps {
  imgUrl: string;
  shopName: string;
  address1: string;
  hourlyPay: number;
  startTime: string;
  startHour: string;
  state: boolean;
}

const Post = ({
  imgUrl,
  shopName,
  address1,
  hourlyPay,
  startTime,
  startHour,
  state,
}: PostProps): React.ReactElement => {
  return (
    <div
      className={`flex h-[348px] w-[312px] flex-shrink-0 snap-center flex-col content-center gap-4 rounded-xl border bg-white p-[16px] mob:h-[260px] mob:w-[171px] mob:gap-2 mob:p-3 
      ${state ? "hover:border-red-40" : "select-none"}`}
    >
      <div className={`relative h-[160px]`}>
        {!state && (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-black opacity-80">
            <div className="p-2 text-center font-Spoqa text-3xl font-bold text-white mob:text-xl">
              지난 공고
            </div>
          </div>
        )}
        <Image
          src={imgUrl}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          alt="image"
        />
      </div>

      <div className="flex h-auto flex-col gap-4 mob:gap-1">
        <div className="flex flex-col gap-2 mob:gap-1">
          <div
            className={`text-xl font-bold mob:text-[16px] ${
              state ? "" : "text-gray-30"
            }`}
          >
            {shopName}
          </div>

          <div className={`flex flex-row items-start gap-4 mob:gap-3`}>
            <SvgTimeComponent color={state ? "#FFAF9B" : "#CBC9CF"} />

            <div className="gap- flex flex-row gap-4 mob:flex-col mob:gap-1">
              <div
                className={`text-sm mob:text-xs ${
                  state ? "text-gray-50" : "text-gray-30"
                }`}
              >
                {startTime}
              </div>
              <div
                className={`text-sm  mob:text-xs ${
                  state ? "text-gray-50" : "text-gray-30"
                }`}
              >
                {startHour}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <SvgLocationComponent color={state ? "#FFAF9B" : "#CBC9CF"} />
            <div
              className={`text-sm mob:text-[12px] ${state ? "text-gray-50 " : "text-gray-30"}`}
            >
              {address1}
            </div>
          </div>
        </div>
        <div
          className={`flex w-full items-center justify-between gap-2 whitespace-nowrap mob:flex-col mob:items-start mob:gap-0`}
        >
          <Tooltip content={`${hourlyPay.toLocaleString()}원`}>
            <div
              className={`w-[110px] truncate text-[22px] font-bold mob:text-[18px]  ${state ? "" : "text-gray-30"}`}
            >
              {hourlyPay.toLocaleString()}원
            </div>
          </Tooltip>
          <Tooltip content={`기존 시급보다 100%`}>
            <div
              className={`flex ${state ? "w-[168px]" : "w-fit"} rounded-3xl p-3 text-sm font-bold text-white mob:w-[130px] mob:bg-white mob:p-0 mob:font-light mob:text-red-40 ${
                state ? "bg-red-40" : "bg-gray-30 mob:text-gray-30"
              }`}
            >
              {state ? (
                <div className="w-[145px] truncate mob:text-[12px]">{`기존 시급보다 100%`}</div>
              ) : (
                <div className="w-[45px] truncate mob:flex mob:w-[140px] mob:flex-row">
                  <span
                    className={`${state ? "" : "text-white mob:text-gray-30"}`}
                  >
                    <span className="hidden text-gray-30 mob:inline mob:text-[12px]">
                      기존 시급보다{" "}
                    </span>
                    {`1000%`}
                  </span>
                  <div className="hidden mob:inline">
                    <SvgArrowComponent color={state ? "#FF4040" : "#CBC9CF"} />
                  </div>
                </div>
              )}
              <div className="mob:hidden">
                <SvgArrowComponent color={"#FFFFFF"} />
              </div>
              <div className="hidden mob:inline">
                <SvgArrowComponent color={state ? "#FF4040" : "#CBC9CF"} />
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Post;

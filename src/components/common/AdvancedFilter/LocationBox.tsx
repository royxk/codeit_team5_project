"use client";
import React from "react";

const S = [
  "서울시 송파구",
  "서울시 강남구",
  "서울시 강북구",
  "서울시 강동구",
  "서울시 강서구",
  "서울시 관악구",
  "서울시 광진구",
  "서울시 구로구",
  "서울시 금천구",
  "서울시 노원구",
  "서울시 도봉구",
  "서울시 동대문구",
  "서울시 동작구",
  "서울시 마포구",
  "서울시 서대문구",
  "서울시 서초구",
  "서울시 성동구",
  "서울시 성북구",
  "서울시 송파구",
  "서울시 양천구",
  "서울시 영등포구",
  "서울시 용산구",
  "서울시 은평구",
  "서울시 종로구",
  "서울시 중구",
  "서울시 중랑구",
];

type LocationBoxProps = {
  selectedLocations: string[];
  handleClick: (location: string) => void;
};

const LocationBox = ({ selectedLocations, handleClick }: LocationBoxProps) => {
  return (
    <div
      className={`flex h-64 w-full flex-row flex-wrap overflow-y-scroll rounded-xl border px-8 py-4 leading-10 `}
    >
      {S.map((s, index) => (
        <div
          className={`w-32 select-none`}
          key={index}
          onClick={(e) => handleClick(s)}
        >
          {s}
        </div>
      ))}
    </div>
  );
};

export default LocationBox;

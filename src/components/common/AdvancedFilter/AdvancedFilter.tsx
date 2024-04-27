"use client";
import React, { useEffect, useState } from "react";
import LocationBox from "./LocationBox";
import Button from "../Button";
import SelectedLocationBox from "./SelectedLocationBox";
import SvgCloseButton from "./SvgCloseButton";
import { getCurrentDate, getCurrentRFC3339DateTime } from "@/util/formatDate";
import type { AdvancedFilterQuery } from "@/util/convertData";
import { Address } from "@/util/api";
import Link from "next/link";

interface AdvancedFilterProps {
  handleReset: () => void;
  setIsAdvancedFilterOpen: (value: React.SetStateAction<boolean>) => void;
  onAdvencedFilterSubmit: (query: AdvancedFilterQuery) => void;
  onClick: (event: React.MouseEvent) => void;
  setcount?: (count: number) => void;
  locations: Address[];
  startDate: string;
  price: string;
  setLocations: (locations: Address[]) => void;
  setStartDate: (startDate: string) => void;
  setPrice: (price: string) => void;
}

function AdvancedFilter({
  handleReset,
  setIsAdvancedFilterOpen,
  onAdvencedFilterSubmit,
  onClick,
  setcount,
  locations,
  startDate,
  price,
  setLocations,
  setStartDate,
  setPrice,
}: AdvancedFilterProps) {
  // Function to calculate and update the count based on current state
  const updateCount = () => {
    let newCount = locations.length; // Start with the number of locations
    if (startDate) newCount += 1; // Add one if there's a valid startDate
    if (price && Number(price) > 0) newCount += 1; // Add one if price is a positive number
    setcount && setcount(newCount);
  };

  const addLocation = (location: Address): void => {
    const newLocations = locations.includes(location)
      ? locations.filter((loc) => loc !== location)
      : [...locations, location];
    setLocations(newLocations as Address[]);
  };

  const deleteLocation = (location: Address): void => {
    setLocations(locations.filter((loc) => loc !== location) as Address[]);
  };

  const handleSubmit = (): void => {
    const query: { [key: string]: Address[] | string | number } = {};
    if (locations.length > 0) {
      query.address = locations as Address[];
    }
    if (startDate) {
      query.startsAtGte = getCurrentRFC3339DateTime(startDate);
    }
    if (price) {
      query.hourlyPayGte = Number(price);
    }
    console.log(startDate);
    console.log(query);
    onAdvencedFilterSubmit(query);
    setIsAdvancedFilterOpen(false);
  };

  //숫자로 구성된 문자열로 변환하고 9자를 넘기지 않도록 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const numericValue = newValue.replace(/\D/g, "");
    setPrice(numericValue.substring(0, 9));
  };

  //백스페이스와 숫자만 허용
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace" && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Effect to handle inputs and locations changes
  useEffect(() => {
    updateCount();
  }, [locations, startDate, price]);

  return (
    <>
      <div
        className={`z-50 flex w-96 flex-col justify-between gap-4 rounded-xl border-2 bg-white px-5 py-6 mob:h-screen mob:w-full mob:rounded-none mob:border-none`}
      >
        <div className={`flex flex-row justify-between`}>
          <div className={`text-[20px] font-bold`}>상세필터</div>
          <div onClick={onClick} className="hover:cursor-pointer">
            <SvgCloseButton />
          </div>
        </div>
        <div className={`flex flex-col gap-2`}>
          <div>위치</div>
          <LocationBox selectedLocations={locations} onClick={addLocation} />
          <SelectedLocationBox
            selectedLocations={locations}
            onClick={deleteLocation}
          />
        </div>
        <div className={`flex flex-col gap-2 border-t-2 py-4`}>
          <div>시작일</div>
          <input
            className={`h-16 w-full rounded-xl border px-4 focus:outline-none`}
            placeholder="입력"
            min={getCurrentDate()}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
        </div>
        <div className={`flex w-full flex-col gap-3 border-t-2 py-4`}>
          <div>금액</div>
          <div className={`flex w-full flex-row items-center gap-2`}>
            <div
              className={`flex h-16 flex-row items-center gap-2 rounded-xl border px-4 `}
            >
              <input
                className={`focus:outline-none`}
                placeholder="입력"
                type="text"
                value={price}
                maxLength={9}
                onKeyDown={(e) => handleInputKeyDown(e)}
                onChange={(e) => handleInputChange(e)}
              />
              <div>원</div>
            </div>
            <div>이상부터</div>
          </div>
        </div>
        <div
          className={`flex w-full flex-row justify-between gap-3 mob:sticky mob:bottom-4 mob:border-t-2 mob:bg-white mob:pt-5`}
        >
          <Button
            className={`w-[82px]`}
            color="white"
            size="full"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Link
            className="w-full"
            onClick={handleSubmit}
            href={"#filterdNoticeSection"}
          >
            <Button color="red" size="full">
              적용하기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdvancedFilter;

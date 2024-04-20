"use client";
import React from "react";
import LocationBox from "./LocationBox";
import Button from "../Button";
import SelectedLocationBox from "./SelectedLocationBox";

interface AdvancedFilterProps {
  onClick: () => void;
  setcount?: (count: number) => void;
  locations: string[];
  startDate: string;
  price: string;
  setLocations: (locations: string[]) => void;
  setStartDate: (startDate: string) => void;
  setPrice: (price: string) => void;
}

function AdvancedFilter({
  onClick,
  setcount,
  locations,
  startDate,
  price,
  setLocations,
  setStartDate,
  setPrice,
}: AdvancedFilterProps) {
  const addLocation = (location: string): void => {
    if (locations.includes(location)) {
      setLocations(locations.filter((loc) => loc !== location));
      return;
    }
    setLocations([...locations, location]);
    console.log(locations);
  };

  const deleteLocation = (location: string): void => {
    setLocations(locations.filter((loc) => loc !== location));
  };

  const handleSubmit = (): void => {
    const filterData = {
      locations: locations,
      startDate: startDate,
      price: price,
    };
    setcount && setcount(locations.length);
    console.log(filterData);
  };

  const handleReset = (): void => {
    setLocations([]);
    setStartDate("");
    setPrice("");
    setcount && setcount(0);
  };

  return (
    <div
      className={`flex w-96 flex-col gap-4 rounded-xl border-2 px-5 py-6 tab:w-full`}
    >
      <div className={`flex flex-row justify-between`}>
        <div>상세필터</div>
        <div onClick={onClick}>닫기</div>
      </div>
      <div>
        <div>위치</div>
        <LocationBox selectedLocations={locations} handleClick={addLocation} />
        <SelectedLocationBox
          selectedLocations={locations}
          handleClick={deleteLocation}
        />
      </div>
      <div>
        <div>시작일</div>
        <input
          className={`h-16 w-full rounded-xl border px-4 focus:outline-none`}
          placeholder="입력"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
      </div>
      <div className={`flex w-full flex-col gap-3`}>
        <div>금액</div>
        <div className={`flex w-full flex-row items-center gap-2`}>
          <div
            className={`flex h-16 flex-row items-center gap-2 rounded-xl border px-4 `}
          >
            <input
              className={`focus:outline-none`}
              placeholder="입력"
              type="number"
              defaultValue={Number(price)}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className={``}>원</div>
          </div>
          <div>이상부터</div>
        </div>
      </div>
      <div className={`flex w-full flex-row justify-between gap-3`}>
        <Button
          className={`w-16`}
          color="white"
          size="full"
          onClick={handleReset}
        >
          초기화
        </Button>
        <Button color="red" size="full" onClick={handleSubmit}>
          적용하기
        </Button>
      </div>
    </div>
  );
}

export default AdvancedFilter;

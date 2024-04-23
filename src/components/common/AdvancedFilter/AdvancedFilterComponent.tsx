"use client";
import React, { use, useState } from "react";
import AdvancedFilter from "./AdvancedFilter";
import { useEffect } from "react";

const AdvancedFilterComponent = () => {
  const [isNotAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [locations, setLocations] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const toggleFilterModal = () => {
    setIsAdvancedFilterOpen(!isNotAdvancedFilterOpen);
    setCount(0);
  };

  useEffect(() => {}, [count]);

  return (
    <div className={`relative content-end`}>
      <div className={`flex justify-end`}>
        <div
          className={`${isNotAdvancedFilterOpen ? "mob:invisible" : ""} h-auto w-[79px] select-none rounded-md bg-red-20 py-2 text-center text-sm text-white`}
          onClick={toggleFilterModal}
        >
          상세 필터 {count > 0 && `(${count})`}
        </div>
        {isNotAdvancedFilterOpen && (
          <div className={`ml-13 absolute z-50 mt-14 tab:right-0 mob:m-0`}>
            <AdvancedFilter
              locations={locations}
              startDate={startDate}
              price={price}
              setLocations={setLocations}
              setStartDate={setStartDate}
              setPrice={setPrice}
              setcount={setCount}
              onClick={toggleFilterModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilterComponent;

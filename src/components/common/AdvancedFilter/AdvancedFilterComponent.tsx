"use client";
import React, { useState } from "react";
import AdvancedFilter from "./AdvancedFilter";

const AdvancedFilterComponent = () => {
  const [isNotAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [locations, setLocations] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const toggleFilterModal = () => {
    setIsAdvancedFilterOpen(!isNotAdvancedFilterOpen);
  };
  return (
    <div className={`relative content-end`}>
      <div className={`flex justify-end`}>
        <div
          className={`${isNotAdvancedFilterOpen ? "tab:invisible" : ""} h-auto w-28  select-none rounded-xl bg-red-20 p-3 text-center text-white`}
          onClick={toggleFilterModal}
        >
          상세 필터 {count > 0 && `(${count})`}
        </div>
        {isNotAdvancedFilterOpen && (
          <div className={`ml-13 absolute z-0 mt-14 tab:right-0 tab:m-0`}>
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

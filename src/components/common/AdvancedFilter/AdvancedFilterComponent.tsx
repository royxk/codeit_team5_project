"use client";
import React, { use, useState, useRef } from "react";
import AdvancedFilter from "./AdvancedFilter";
import { useEffect } from "react";

const AdvancedFilterComponent = () => {
  const [isNotAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [locations, setLocations] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  const toggleFilterModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsAdvancedFilterOpen(!isNotAdvancedFilterOpen);
    setCount(0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !(event.target as Element).closest("#advanced-filter-modal")
    ) {
      setIsAdvancedFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotAdvancedFilterOpen, count]);

  return (
    <div className={`relative content-end`}>
      <div className={`flex justify-end`}>
        <div
          className={`${isNotAdvancedFilterOpen ? "mob:invisible" : ""} h-auto w-[79px] select-none rounded-md bg-red-20 py-2 text-center text-sm text-white`}
          onClick={toggleFilterModal}
          id="advanced-filter-modal"
        >
          상세 필터 {count > 0 && `(${count})`}
        </div>
        {isNotAdvancedFilterOpen && (
          <div
            ref={modalRef}
            onClick={(event) => event.stopPropagation()}
            className={`ml-13 absolute z-[100] mt-14 tab:right-0 mob:fixed mob:top-0 mob:mt-0 mob:h-screen`}
          >
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

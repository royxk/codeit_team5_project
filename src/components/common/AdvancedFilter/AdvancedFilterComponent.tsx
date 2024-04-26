"use client";
import React, { useState, useRef } from "react";
import AdvancedFilter from "./AdvancedFilter";
import { useEffect } from "react";
import type { AdvancedFilterQuery } from "@/util/convertData";
import type { Address } from "@/util/api";

export interface AdvencedFilterComponentProp {
  keyword: string | null | undefined;
  onAdvencedFilterSubmit: (query: AdvancedFilterQuery) => void;
}

const AdvancedFilterComponent = ({
  keyword,
  onAdvencedFilterSubmit,
}: AdvencedFilterComponentProp) => {
  const [isNotAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [locations, setLocations] = React.useState<Address[]>([]);
  const [startDate, setStartDate] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  const toggleFilterModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsAdvancedFilterOpen(!isNotAdvancedFilterOpen);
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

  const handleReset = (): void => {
    setLocations([]);
    setStartDate("");
    setPrice("");
  };

  useEffect(() => {
    handleReset();
    setCount(0);
  }, [keyword]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotAdvancedFilterOpen, count]);

  return (
    <div className={`relative content-end `}>
      <div className={`flex justify-end`}>
        <div
          className={`${isNotAdvancedFilterOpen ? "mob:invisible" : ""} flex h-auto w-fit select-none flex-row gap-1 rounded-md bg-red-20 px-2 py-1 text-center text-sm text-white hover:cursor-pointer`}
          onClick={toggleFilterModal}
          id="advanced-filter-modal"
        >
          <div>상세필터 </div>
          <div>{count > 0 && `(${count})`}</div>
        </div>
        {isNotAdvancedFilterOpen && (
          <div
            ref={modalRef}
            onClick={(event) => event.stopPropagation()}
            className={`ml-13 absolute z-[100] mt-9 tab:right-0 mob:fixed mob:top-0 mob:mt-0 mob:h-screen`}
          >
            <AdvancedFilter
              handleReset={handleReset}
              setIsAdvancedFilterOpen={setIsAdvancedFilterOpen}
              onAdvencedFilterSubmit={onAdvencedFilterSubmit}
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

"use client";
import React, { useEffect, useRef, useState } from "react";
import BasicFilterSvg from "./BasicFilterArrow";
import {
  BASIC_FILTER_INITIALVALUE,
  MENU_DATA,
  PATH_DATA,
} from "@/util/constants/FILTER_VALUES";
import { SortType } from "@/util/convertData";

const BasicFilter = ({
  onBasicFilterClick,
}: {
  onBasicFilterClick: (sortType: SortType) => void;
}) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(true);
  const [filterSelected, setFilterSelected] = useState(
    BASIC_FILTER_INITIALVALUE,
  );
  const [pathData, setPathData] = useState(PATH_DATA.down);
  const handleFilterClick = () => {
    setIsHidden(!isHidden);
    setPathData((prev) =>
      prev === PATH_DATA.down ? PATH_DATA.up : PATH_DATA.down,
    );
  };
  const handleFilterSelectedClick = (e: React.MouseEvent) => {
    setFilterSelected((e.target as HTMLButtonElement).innerHTML);
    onBasicFilterClick((e.target as HTMLButtonElement).innerHTML as SortType);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      filterRef.current &&
      !(e.target as Element).closest("#basic-filter-container") &&
      !filterRef.current.contains(e.target as Node)
    ) {
      setIsHidden(true);
      setPathData(PATH_DATA.down);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="basic-filter-container"
      onClick={handleFilterClick}
      className="relative flex w-[107px] items-center text-left"
    >
      <button
        type="button"
        className="inline-flex w-full justify-between gap-x-1.5 whitespace-nowrap rounded-md bg-gray-10 px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300"
        id="menu-button"
        aria-expanded={!isHidden}
        aria-haspopup="true"
      >
        {filterSelected}
        <BasicFilterSvg pathData={pathData} />
      </button>
      <div
        ref={filterRef}
        onClick={handleFilterSelectedClick}
        className={`absolute right-0 top-7 z-[55] mt-2 flex w-[105px] origin-top-right flex-col items-center divide-y divide-gray-20 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isHidden ? `hidden` : `block`}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        {MENU_DATA.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center justify-center ${index === 0 ? `rounded-t-md` : ``} ${index === MENU_DATA.length - 1 ? `rounded-b-md` : ``} hover:bg-gray-10`}
            role="none"
          >
            <button
              className="block w-[105px] px-4 py-3 text-sm font-normal text-gray-700"
              role="menuitem"
              tabIndex={-1}
              key={item.id}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicFilter;

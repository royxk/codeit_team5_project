"use client";
import React, { useState } from "react";

const BasicFilter = () => {
  const [isHidden, setIsHidden] = useState(true);
  const handleFilterClick = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div
      onClick={handleFilterClick}
      className="relative inline-block items-center text-left"
    >
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-10 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        마감임박순
        <svg
          className="mt-2"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
        >
          <path d="M5 8L0.669872 0.5L9.33013 0.5L5 8Z" fill="#111322" />
        </svg>
      </button>
      <div
        onClick={(e) => console.log((e.target as HTMLButtonElement).innerHTML)}
        className={`absolute right-0 z-10 mt-2 flex w-[105px] origin-top-right flex-col items-center divide-y divide-gray-20 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isHidden ? `hidden` : `block`}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="rounded-t-md py-1 hover:bg-gray-10" role="none">
          <button
            className="block px-4 py-2 text-sm font-normal text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0"
          >
            마감임박순
          </button>
        </div>
        <div className="py-1 hover:bg-gray-10" role="none">
          <button
            className="block px-4 py-2 text-sm font-normal text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-1"
          >
            시급많은순
          </button>
        </div>
        <div className="py-1 hover:bg-gray-10" role="none">
          <button
            className="block px-4 py-2 text-sm font-normal text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-2"
          >
            시간적은순
          </button>
        </div>
        <div className="rounded-b-md py-1 hover:bg-gray-10" role="none">
          <button
            className="block px-4 py-2 text-sm font-normal text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-3"
          >
            가나다순
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicFilter;

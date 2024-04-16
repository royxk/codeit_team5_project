"use client";
import React from "react";

interface PaginationProps {
  totalNumberOfItems: number;
}
const pageNum = [1, 2, 3, 4, 5, 6, 7];

const Pagination = ({ totalNumberOfItems }: PaginationProps) => {
  return (
    <div className="flex h-16 w-full items-center justify-center gap-5 bg-white p-3 mob:h-[3.625rem]">
      <button
        type="button"
        className="h-full max-h-5 w-full max-w-5 bg-[url('/pagination-left-possible.svg')]"
      />
      <div className="flex gap-1">
        {pageNum.map((item) => (
          <button
            key={item}
            className={`h-10 w-10 rounded-[4px] bg-red-30 text-white`}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="h-full max-h-5 w-full max-w-5 bg-[url('/pagination-right.svg')]"
      />
    </div>
  );
};

export default Pagination;

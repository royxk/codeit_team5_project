"use client";
import React, { useState } from "react";

interface PaginationProps {
  totalNumberOfItems: number;
}
const pageNum = [1, 2, 3, 4, 5, 6, 7];

const Pagination = ({ totalNumberOfItems }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const isPaginationNeed = pageNum.length > 7;

  return (
    <div className="flex h-16 w-full items-center justify-center gap-5 bg-white p-3 mob:h-[3.625rem]">
      {isPaginationNeed && (
        <button
          type="button"
          className={`h-full max-h-5 w-full max-w-5 
        ${currentPage == 0 ? "bg-[url('/pagination-left-impossible.svg')]" : "bg-[url('/pagination-left-possible.svg')]"}`}
        />
      )}
      <div className="flex gap-1">
        {pageNum.map((item, i) => (
          <button
            key={i}
            className={`h-10 w-10 rounded-[4px] ${currentPage === i ? "bg-red-30 text-white" : "text-black"}`}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {isPaginationNeed && currentPage !== pageNum.length - 1 && (
        <button
          type="button"
          className="h-full max-h-5 w-full max-w-5 bg-[url('/pagination-right.svg')]"
        />
      )}
    </div>
  );
};

export default Pagination;

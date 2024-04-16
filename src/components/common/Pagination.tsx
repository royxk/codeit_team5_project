"use client";
import React, { useState } from "react";

interface PaginationProps {
  rawPageData: unknown[];
  setCurrentPageData: (currentPageData: unknown[]) => void;
  pageItemLimit?: number;
}

const testData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];

/**
 * @param {pageData[]} rawPageData 페이지에 표시할 순수 배열 데이터를 받는 param입니다. 이 데이터를 가공하여 [페이지][페이지 데이터] 형태의 2차원 배열로 가공합니다.
 * @param {StateSetFunction} setCurrentPageData 현재 페이지에 보여줄 데이터를 설정하는 setState함수를 받아 페이지 선택 시 그 값으로 설정합니다.
 * @param {number} pageItemLimit 현재 페이지에 얼마나 많은 개수를 표기할 지 선택하는 인수입니다. 기본적으로 코드잇에서 제공하는 5값으로 되어있으며 필요수 추가로 수정할 수 있게 하였습니다.
 * @returns
 */
const Pagination = ({
  rawPageData = testData,
  setCurrentPageData = (item) => {
    console.log(`${item}`);
  },
  pageItemLimit = 5,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageData: unknown[][] = [];
  const tempPageData: unknown[] = [];
  rawPageData.map((item, index) => {
    tempPageData.push(item);
    if (
      index === rawPageData.length - 1 ||
      (index !== 0 && (index + 1) % pageItemLimit === 0)
    ) {
      pageData.push(tempPageData.slice());
      tempPageData.splice(0);
    }
  });

  // 페이지 번호 설정에 따라 발생시킬 함수
  const handlePageNumberChange = (index: number) => {
    setCurrentPage(index);
    setCurrentPageData(pageData[index]);
  };

  // 페이지 숫자 양 옆의 화살표 버튼 클릭 시 실행할 함수
  const handlePaginationArrowButton = (direction: string) => {
    switch (direction) {
      case "left":
        if (currentPage !== 0) {
          handlePageNumberChange(currentPage - 1);
        }
        break;
      case "right":
        if (currentPage !== pageData.length - 1) {
          handlePageNumberChange(currentPage + 1);
        }
        break;
      default:
        console.error("이게 뜨면 안됨");
    }
  };

  const isPaginationNeed = pageData.length > 7;

  return (
    <div className="flex h-16 w-full items-center justify-center gap-5 bg-white p-3 mob:h-[3.625rem]">
      {isPaginationNeed && (
        <button
          type="button"
          className={`h-full max-h-5 w-full max-w-5 
        ${currentPage == 0 ? "cursor-default bg-[url('/pagination-left-impossible.svg')]" : "bg-[url('/pagination-left-possible.svg')]"}`}
          onClick={() => handlePaginationArrowButton("left")}
        />
      )}
      <div className="flex gap-1">
        {pageData.map((item, i) => (
          <button
            key={i}
            className={`h-10 w-10 rounded-[4px] ${currentPage === i ? "bg-red-30 text-white" : "text-black"}`}
            onClick={() => handlePageNumberChange(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {isPaginationNeed && (
        <button
          type="button"
          className={`h-full max-h-5 w-full max-w-5 ${currentPage !== pageData.length - 1 ? "bg-[url('/pagination-right.svg')]" : "cursor-default"}`}
          onClick={() => handlePaginationArrowButton("right")}
        />
      )}
    </div>
  );
};

export default Pagination;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PaginationProps {
  rawPageData: unknown[];
  setCurrentPageData: (currentPageData: unknown[]) => void;
  pageItemLimit?: number;
}

/**
 * @param {pageData[]} rawPageData 페이지에 표시할 순수 배열 데이터를 받는 param입니다. 이 데이터를 가공하여 [페이지][페이지 데이터] 형태의 2차원 배열로 가공합니다.
 * @param {StateSetFunction} setCurrentPageData 현재 페이지에 보여줄 데이터를 설정하는 setState함수를 받아 페이지 선택 시 그 값으로 설정합니다.
 * @param {number} pageItemLimit 현재 페이지에 얼마나 많은 개수를 표기할 지 선택하는 인수입니다. 기본적으로 코드잇에서 제공하는 5값으로 되어있으며 필요시 추가로 수정할 수 있게 하였습니다.
 * @returns
 */
const Pagination = ({
  rawPageData = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ],
  setCurrentPageData = (item) => {
    console.log(`${item}`);
  },
  pageItemLimit = 5,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageList, setCurrentPageList] = useState([0]);
  const pageData: unknown[][] = [];

  // rawPageData 가공
  const tempPageData: unknown[] = [];
  if (rawPageData.length !== 0) {
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
  }
  const isPaginationNeed = pageData.length > 7;

  const firstPageList: number[] = [];
  if (!isPaginationNeed) {
    if (pageData.length === 0) {
      firstPageList.push(0);
    } else {
      for (let i = 0; i < pageData.length; i++) {
        firstPageList.push(i);
      }
    }
  }

  // 현재 선택 가능한 페이지 리스트를 다루는 함수, pagination이 필요하지 않으면 작동하지 않음
  const handlePageList = (targetPageNumber: number) => {
    if (isPaginationNeed) {
      const pageListTemp: number[] = [];

      /// 1,2,3을 선택할 경우
      if (targetPageNumber <= 3) {
        setCurrentPageList([0, 1, 2, 3, 4, 5, 6]);
        return;
      }

      // 중앙 페이지 구간을 선택할 경우
      if (3 < targetPageNumber && targetPageNumber < pageData.length - 3) {
        for (let i = targetPageNumber - 3; i <= targetPageNumber + 3; i++) {
          pageListTemp.push(i);
        }
        setCurrentPageList(pageListTemp);
        return;
      }

      // 마지막 세 페이지를 선택할 경우
      if (pageData.length - 3 <= targetPageNumber) {
        for (let i = pageData.length - 1; i >= pageData.length - 7; i--) {
          pageListTemp.unshift(i);
        }
        setCurrentPageList(pageListTemp);
      }
    }
  };

  // 페이지 번호 설정에 따라 발생시킬 함수
  const handlePageNumberChange = (index: number) => {
    handlePageList(index);
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

  useEffect(() => {
    setCurrentPageList(firstPageList);
    handlePageNumberChange(0);
  }, []);

  return (
    <div className="flex h-16 w-full items-center justify-center gap-5 bg-white p-3 mob:h-[3.625rem]">
      {isPaginationNeed && (
        <button
          type="button"
          className={`h-full max-h-5 w-full max-w-5 rotate-180 rounded-full bg-[url('/pagination-arrow.svg')]
          ${currentPage == 0 ? "cursor-default opacity-40" : "hover:bg-gray-10"}`}
          onClick={() => handlePaginationArrowButton("left")}
        />
      )}

      <div className="flex gap-1">
        {currentPageList.map((item) => (
          <button
            type="button"
            key={`pagination-${item + 1}`}
            className={`h-10 w-10 rounded-[4px] 
            ${currentPage === item ? "bg-red-30 text-white" : "text-black hover:bg-gray-10"}`}
            onClick={() => handlePageNumberChange(item)}
          >
            {item + 1}
          </button>
        ))}
      </div>

      {isPaginationNeed && (
        <button
          type="button"
          className={`relative h-full max-h-5 w-full max-w-5 rounded-full 
          ${currentPage !== pageData.length - 1 ? "bg-[url('/pagination-arrow.svg')] hover:bg-gray-10" : "cursor-default"}`}
          onClick={() => handlePaginationArrowButton("right")}
        />
      )}
    </div>
  );
};

export default Pagination;

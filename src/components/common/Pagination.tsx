"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PaginationProps {
  count: number;
  setCurrentPageData: (currentPageData: number) => void;
  pageItemLimit?: number;
  pageRefreshSwitch?: boolean;
  enableAnchorNavigation?: boolean;
  setIsFilterChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @param {pageData[]} rawPageData 페이지에 표시할 순수 배열 데이터를 받는 param입니다. 이 데이터를 가공하여 [페이지][페이지 데이터] 형태의 2차원 배열로 가공합니다.
 * @param {StateSetFunction} setCurrentPageData 현재 페이지에 보여줄 데이터를 설정하는 setState함수를 받아 페이지 선택 시 그 값으로 설정합니다.
 * @param {number} pageItemLimit 현재 페이지에 얼마나 많은 개수를 표기할 지 선택하는 인수입니다. 기본적으로 코드잇에서 제공하는 5값으로 되어있으며 필요시 추가로 수정할 수 있게 하였습니다.
 * @param {boolean} pageRefreshSwitch boolean 형이 변화할 때 마다 바뀌었다는 것을 알려주는 인자입니다. setState(!state) 형식으로 초기화가 필요한 작업 끝단에 넣어주시면 될 듯 합니다.
 * @param {boolean} enableAnchorNavigation 앵커로 특정 id로 이동하는 기능이 필요한 경우 사용하는 prop입니다. 현재는 메인페이지밖에 사용하지 않으므로 고정된 id로 이동합니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsFilterChanged 페이지 이동할때 filter변경이 이뤄지지 않는다고 세팅을 해줘야해서 받는 setter함수입니다.
 * @returns
 */
const Pagination = ({
  count,
  setCurrentPageData = (item) => {
    console.log(`${item}`);
  },
  pageItemLimit = 5,
  pageRefreshSwitch,
  enableAnchorNavigation,
  setIsFilterChanged,
}: PaginationProps) => {
  const pageData = Math.ceil(count / pageItemLimit);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageList, setCurrentPageList] = useState([0]);

  const isPaginationNeed = pageData > 7;

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
      if (3 < targetPageNumber && targetPageNumber < pageData - 3) {
        for (let i = targetPageNumber - 3; i <= targetPageNumber + 3; i++) {
          pageListTemp.push(i);
        }
        setCurrentPageList(pageListTemp);
        return;
      }

      // 마지막 세 페이지를 선택할 경우
      if (pageData - 3 <= targetPageNumber) {
        for (let i = pageData - 1; i >= pageData - 7; i--) {
          pageListTemp.unshift(i);
        }
        setCurrentPageList(pageListTemp);
      }
    }
  };

  // 페이지 번호 설정에 따라 발생시킬 함수
  const handlePageNumberChange = (index: number) => {
    setIsFilterChanged?.(false);
    handlePageList(index);
    setCurrentPage(index);
    setCurrentPageData(index);
  };

  // 페이지 숫자 양 옆의 화살표 버튼 클릭 시 실행할 함수
  const handlePaginationArrowButton = (direction: string) => {
    setIsFilterChanged?.(false);
    switch (direction) {
      case "left":
        if (currentPage !== 0) {
          handlePageNumberChange(currentPage - 1);
        }
        break;
      case "right":
        if (currentPage !== pageData - 1 && pageData !== 0) {
          handlePageNumberChange(currentPage + 1);
        }
        break;
      default:
        console.error("이게 뜨면 안됨");
    }
  };

  useEffect(() => {
    const firstPageList: number[] = [];
    if (!isPaginationNeed) {
      if (pageData === 0) {
        firstPageList.push(0);
      } else {
        for (let i = 0; i < pageData; i++) {
          firstPageList.push(i);
        }
      }
    }
    setCurrentPageList(firstPageList);
    handlePageNumberChange(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    handlePageNumberChange(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageRefreshSwitch]);

  return (
    <div className="flex h-16 w-full items-center justify-center gap-5 bg-white p-3 mob:h-[3.625rem]">
      {enableAnchorNavigation ? (
        currentPage !== 0 ? (
          <>
            <Link
              className="h-full max-h-5 w-full max-w-5 rounded-full"
              href={currentPage !== 0 ? `#filterdNoticeSection` : `#`}
            >
              <button
                type="button"
                className={`h-full max-h-5 w-full max-w-5 rotate-180 rounded-full bg-[url('/pagination-arrow.svg')]
          ${currentPage !== 0 ? "hover:bg-gray-10" : "cursor-default opacity-40"}`}
                onClick={() => handlePaginationArrowButton("left")}
              />
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`h-full max-h-5 w-full max-w-5 rotate-180 rounded-full bg-[url('/pagination-arrow.svg')]
          ${currentPage !== 0 ? "hover:bg-gray-10" : "cursor-default opacity-40"}`}
              onClick={() => handlePaginationArrowButton("left")}
            />
          </>
        )
      ) : (
        <button
          type="button"
          className={`h-full max-h-5 w-full max-w-5 rotate-180 rounded-full bg-[url('/pagination-arrow.svg')]
          ${currentPage !== 0 ? "hover:bg-gray-10" : "cursor-default opacity-40"}`}
          onClick={() => handlePaginationArrowButton("left")}
        />
      )}

      <div className="flex gap-1">
        {currentPageList.map((item) => (
          <>
            {enableAnchorNavigation ? (
              <Link href={`#filterdNoticeSection`}>
                <button
                  type="button"
                  key={`pagination-${item + 1}`}
                  className={`h-10 w-10 rounded-[4px] mob:h-8 mob:w-8 mob:text-xs 
            ${currentPage === item ? "bg-red-30 text-white" : "text-black hover:bg-gray-10"}`}
                  onClick={() => handlePageNumberChange(item)}
                >
                  {item + 1}
                </button>
              </Link>
            ) : (
              <button
                type="button"
                key={`pagination-${item + 1}`}
                className={`h-10 w-10 rounded-[4px] mob:h-8 mob:w-8 mob:text-xs
            ${currentPage === item ? "bg-red-30 text-white" : "text-black hover:bg-gray-10"}`}
                onClick={() => handlePageNumberChange(item)}
              >
                {item + 1}
              </button>
            )}
          </>
        ))}
      </div>
      {enableAnchorNavigation ? (
        currentPage !== pageData - 1 && pageData !== 0 ? (
          <>
            <Link
              className="h-full max-h-5 w-full max-w-5 rounded-full"
              href={`#filterdNoticeSection`}
            >
              <button
                type="button"
                className={`h-full max-h-5 w-full max-w-5 rounded-full bg-[url('/pagination-arrow.svg')] 
        ${currentPage !== pageData - 1 && pageData !== 0 ? " hover:bg-gray-10" : "cursor-default opacity-40"}`}
                onClick={() => handlePaginationArrowButton("right")}
              />
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`h-full max-h-5 w-full max-w-5 rounded-full bg-[url('/pagination-arrow.svg')] 
          ${currentPage !== pageData - 1 && pageData !== 0 ? " hover:bg-gray-10" : "cursor-default opacity-40"}`}
              onClick={() => handlePaginationArrowButton("right")}
            />
          </>
        )
      ) : (
        <button
          type="button"
          className={`relative h-full max-h-5 w-full max-w-5 rounded-full bg-[url('/pagination-arrow.svg')] 
          ${currentPage !== pageData - 1 && pageData !== 0 ? " hover:bg-gray-10" : "cursor-default opacity-40"}`}
          onClick={() => handlePaginationArrowButton("right")}
        />
      )}
    </div>
  );
};

export default Pagination;

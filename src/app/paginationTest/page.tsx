"use client";
import Pagination from "@/components/common/Pagination";
import React, { useRef, useState } from "react";

type Props = {};

const PaginationTest = (props: Props) => {
  const [pageNum, setPageNum] = useState(0);

  const inputNum = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        className="min-w-20 border-2 border-black bg-gray-5 px-5 py-5"
        ref={inputNum}
      ></input>

      <Pagination count={pageNum} setCurrentPageData={() => {}} />
      <button onClick={() => setPageNum(Number(inputNum.current!.value))}>
        {" "}
        바꾸기 버튼
      </button>
    </>
  );
};

export default PaginationTest;

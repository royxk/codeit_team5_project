"use client";
import BasicFilter from "@/components/home/BasicFilter";
import PostTest from "./postTest/page";
import CustomNotice from "@/components/home/CustomNotice";
import Pagination from "@/components/common/Pagination";
import { searchNoticeApiResponse } from "@/util/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [customNoticeList, setCustomNoticeList] = useState();
  const customNoticeData = async () => {
    const { items } = await searchNoticeApiResponse();
    console.log(items);
    setCustomNoticeList(items);
  };
  useEffect(() => {
    customNoticeData();
  }, []);
  return (
    <>
      <section className="flex justify-center bg-red-10 py-[60px]">
        <div className="flex max-w-[964px] flex-col items-center">
          <h1 className="w-full pb-[31px] text-left text-[28px] font-bold tracking-[0.56px]">
            맞춤공고
          </h1>
          {/* <CustomNotice items={customNoticeList} /> */}
        </div>
      </section>
      <section className="flex justify-center py-[60px]">
        <div className="flex max-w-[964px] flex-col items-center">
          <div className="flex w-full justify-between pb-[31px] text-left text-[28px] font-bold tracking-[0.56px]">
            <h1>전체공고</h1>
            <div className="flex items-center gap-[10px]">
              <BasicFilter />
              <div>상세 필터</div>
            </div>
          </div>
          {/* <div className="grid w-full grid-cols-3 gap-x-[14px] gap-y-[31px]"></div> */}
          <PostTest />
          {/* <Pagination rawPageData={} setCurrentPageData={} /> */}
        </div>
      </section>
    </>
  );
}

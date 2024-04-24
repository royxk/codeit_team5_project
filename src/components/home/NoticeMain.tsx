"use client";
import React, { useEffect, useState } from "react";
import BasicFilter from "./BasicFilter";
import AdvancedFilterComponent from "../common/AdvancedFilter/AdvancedFilterComponent";
import FilterdNotice from "./FilterdNotice";
import {
  ConvertedSortType,
  convertSortType,
  type SortType,
} from "@/util/convertData";
import type { NoticeResponse } from "@/app/page";
import { searchNoticeApiResponse } from "@/util/api";

type Props = {};

const NoticeMain = (props: Props) => {
  const [filterdByBasicNoticeList, setFilterdByBasicNoticeList] =
    useState<NoticeResponse | null>(null);
  const [sortedQuery, setSortedQuery] = useState<ConvertedSortType | null>(
    null,
  );
  const [prevSortedQuery, setPrevSortedQuery] =
    useState<ConvertedSortType | null>(null);
  const [isSortedQueryChanged, setIsSortedQueryChanged] = useState(false);
  const handleBasicFilterClick = async (sortType: SortType) => {
    const sortQuery = convertSortType(sortType);
    const res = await searchNoticeApiResponse({ limit: 6, sort: sortQuery });
    console.log(res);
    setFilterdByBasicNoticeList(res);

    setSortedQuery(sortQuery);
  };
  useEffect(() => {
    if (sortedQuery !== prevSortedQuery) {
      setIsSortedQueryChanged(true);
      setPrevSortedQuery(sortedQuery);
    } else {
      setIsSortedQueryChanged(false);
    }
  }, [sortedQuery, prevSortedQuery]);
  return (
    <section className="flex justify-center py-[60px]">
      <div className=" mx-auto flex w-[964px] flex-col items-center">
        <div
          id="filterdNoticeSection"
          className="flex w-full justify-between pb-[31px] text-left tracking-[0.56px] mob:flex-col mob:gap-4"
        >
          <h1 className="text-[28px] font-bold mob:text-xl">전체공고</h1>
          <div className="flex h-[42px] items-center gap-[10px]">
            <BasicFilter onBasicFilterClick={handleBasicFilterClick} />
            <AdvancedFilterComponent />
          </div>
        </div>
        <FilterdNotice
          isSortedQueryChanged={isSortedQueryChanged}
          sortedQuery={sortedQuery}
          basicNoticeList={filterdByBasicNoticeList}
        />
      </div>
    </section>
  );
};

export default NoticeMain;

"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { BASIC_FILTER_INITIALVALUE } from "@/util/constants/FILTER_VALUES";

type Props = {};

const NoticeMain = (props: Props) => {
  const [filterdByBasicNoticeList, setFilterdByBasicNoticeList] =
    useState<NoticeResponse | null>(null);
  const [sortedQuery, setSortedQuery] = useState<ConvertedSortType | null>(
    null,
  );
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [filterSelected, setFilterSelected] = useState<SortType>(
    BASIC_FILTER_INITIALVALUE,
  );
  const [prevFilterSelected, setPrevFilterSelected] = useState<SortType>(
    BASIC_FILTER_INITIALVALUE,
  );
  const handleFilterSelectedClick = (e: React.MouseEvent) => {
    setFilterSelected((e.target as HTMLButtonElement).innerHTML as SortType);
    setPrevFilterSelected(filterSelected);
  };
  const handleBasicFilterClick = async (sortType: SortType) => {
    const sortQuery = convertSortType(sortType);
    setSortedQuery(sortQuery);
    const res = await searchNoticeApiResponse({ limit: 6, sort: sortQuery });
    console.log(res);
    setFilterdByBasicNoticeList(res);
  };

  useEffect(() => {
    const executeFilter = async () => {
      console.log(filterSelected);
      console.log(prevFilterSelected);
      if (filterSelected !== prevFilterSelected) {
        setIsFilterChanged(true);
        await handleBasicFilterClick(filterSelected);
      } else {
        setIsFilterChanged(false);
      }
    };

    executeFilter();
  }, [filterSelected, prevFilterSelected]);

  return (
    <section className="flex justify-center py-[60px]">
      <div className=" mx-auto flex w-[964px] flex-col items-center">
        <div
          id="filterdNoticeSection"
          className="flex w-full justify-between pb-[31px] text-left tracking-[0.56px] mob:flex-col mob:gap-4"
        >
          <h1 className="text-[28px] font-bold mob:text-xl">전체공고</h1>
          <div className="flex h-[42px] items-center gap-[10px]">
            <BasicFilter
              filterSelected={filterSelected}
              onFilterSelectedClick={handleFilterSelectedClick}
            />
            <AdvancedFilterComponent />
          </div>
        </div>
        <FilterdNotice
          setIsFilterChanged={setIsFilterChanged}
          isFilterChanged={isFilterChanged}
          sortedQuery={sortedQuery}
          basicNoticeList={filterdByBasicNoticeList}
        />
      </div>
    </section>
  );
};

export default NoticeMain;

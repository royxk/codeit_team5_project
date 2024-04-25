"use client";
import React, { useCallback, useEffect, useState } from "react";
import BasicFilter from "./BasicFilter";
import AdvancedFilterComponent from "../common/AdvancedFilter/AdvancedFilterComponent";
import FilterdNotice from "./FilterdNotice";
import {
  AdvancedFilterQuery,
  ConvertedSortType,
  convertSortType,
  type SortType,
} from "@/util/convertData";
import type { NoticeResponse } from "@/app/page";
import { Query, searchNoticeApiResponse } from "@/util/api";

const NoticeMain = () => {
  //필터링된 공고리스트 상태
  const [filterdNoticeList, setFilterdNoticeList] =
    useState<NoticeResponse | null>(null);
  //기본 sort 쿼리 상태
  const [sortedQuery, setSortedQuery] = useState<ConvertedSortType | null>(
    null,
  );
  //상세 필터 쿼리 상태
  const [sortedAdvancedQuery, setSortedAdvancedQuery] =
    useState<AdvancedFilterQuery | null>(null);
  //기본 필터 변경 상태
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  //현재 선택된 기본 필터 상태
  const [filterSelected, setFilterSelected] = useState<SortType | null>(null);
  //이전에 선택된 기본 필터 상태
  const [prevFilterSelected, setPrevFilterSelected] = useState<SortType | null>(
    null,
  );

  //로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  //전체 페이지 상태
  const [pageCount, setPageCount] = useState<number>(0);

  const getFilterdNoticeData = async (query?: Query) => {
    console.log("첫 리스트 api 가져오기 진입");
    const res = await searchNoticeApiResponse(query);
    console.log(res);
    setFilterdNoticeList(res);
    setPageCount(res.count);
    console.log(pageCount);
    console.log(query);
  };

  const handleFilterSelectedClick = (e: React.MouseEvent) => {
    console.log((e.target as HTMLElement).tagName);
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      setFilterSelected((e.target as HTMLButtonElement).innerHTML as SortType);
      setPrevFilterSelected(filterSelected);
    }
  };
  const handleBasicFilterClick = async (sortType: SortType | null) => {
    console.log("일반필터 클릭");
    if (sortType !== null) {
      const sortQuery = convertSortType(sortType);
      setSortedQuery(sortQuery);
      if (!sortedAdvancedQuery) {
        const res = await searchNoticeApiResponse({
          limit: 6,
          sort: sortQuery,
        });
        setFilterdNoticeList(res);
        console.log(sortQuery);
        console.log(res);
      }
    }
  };

  const handleAdvencedFilterSubmit = async (query: AdvancedFilterQuery) => {
    console.log("상세필터 클릭");
    let res;
    console.log(sortedQuery);
    if (!sortedQuery) {
      res = await searchNoticeApiResponse({ limit: 6, ...query });
    } else {
      res = await searchNoticeApiResponse({
        limit: 6,
        ...query,
        sort: sortedQuery,
      });
    }
    setSortedAdvancedQuery(query);
    setFilterdNoticeList(res);
    setPageCount(res.count);
    console.log(res);
  };

  useEffect(() => {
    const getFirstNoticeData = async () => {
      setIsLoading(true);
      await getFilterdNoticeData({ limit: 6 });
      setIsLoading(false);
    };
    getFirstNoticeData();
  }, []);

  useEffect(() => {
    const executeFilter = () => {
      if (filterSelected !== prevFilterSelected) {
        setIsFilterChanged(true);
        handleBasicFilterClick(filterSelected);
      } else {
        setIsFilterChanged(false);
      }
    };

    executeFilter();
  }, [filterSelected]);

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
            <AdvancedFilterComponent
              onAdvencedFilterSubmit={handleAdvencedFilterSubmit}
            />
          </div>
        </div>
        <FilterdNotice
          isLoading={isLoading}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setIsFilterChanged={setIsFilterChanged}
          isFilterChanged={isFilterChanged}
          sortedAdvancedQuery={sortedAdvancedQuery}
          sortedQuery={sortedQuery}
          filterdNoticeList={filterdNoticeList}
          setFilterdNoticeList={setFilterdNoticeList}
        />
      </div>
    </section>
  );
};

export default NoticeMain;

"use client";
import React, { useEffect, useState } from "react";
import BasicFilter from "./BasicFilter";
import AdvancedFilterComponent from "../common/AdvancedFilter/AdvancedFilterComponent";
import FilterdNotice from "./FilterdNotice";
import {
  type AdvancedFilterQuery,
  type ConvertedSortType,
  convertSortType,
  type SortType,
} from "@/util/convertData";
import type { NoticeResponse } from "@/app/page";
import { Query, searchNoticeApiResponse } from "@/util/api";

interface Keyword {
  keyword?: string | null;
}

const NoticeMain = ({ keyword }: Keyword) => {
  //필터링된 공고리스트 상태
  const [filterdNoticeList, setFilterdNoticeList] =
    useState<NoticeResponse | null>(null);
  //기본 sort 쿼리 상태
  const [sortedQuery, setSortedQuery] = useState<ConvertedSortType | null>(
    null,
  );

  //현재 상세 필터 쿼리 상태
  const [sortedAdvancedQuery, setSortedAdvancedQuery] =
    useState<AdvancedFilterQuery | null>(null);
  //이전 상세 필터 쿼리 상태
  const [prevSortedAdvancedQuery, setPrevSortedAdvancedQuery] =
    useState<AdvancedFilterQuery | null>(null);

  //기본 필터 변경 상태
  const [isFilterChanged, setIsFilterChanged] = useState(false);

  //상세 필터 변경 상태
  const [isAdvancedFilterChanged, setIsAdvancedFilterChanged] = useState(false);

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
    console.log(sortType);
    if (sortType !== null) {
      const sortQuery = convertSortType(sortType);
      setSortedQuery(sortQuery);
      console.log(sortedAdvancedQuery);
      if (!sortedAdvancedQuery) {
        const res = await searchNoticeApiResponse({
          limit: 6,
          sort: sortQuery,
          ...(keyword && { keyword: keyword }),
        });
        setFilterdNoticeList(res);
        console.log(sortQuery);
        console.log(res);
      }
    }
  };

  const handleAdvencedFilterSubmit = async (query: AdvancedFilterQuery) => {
    console.log("상세필터 클릭");
    console.log(sortedQuery);
    if (isAdvancedFilterChanged) {
      const res = await searchNoticeApiResponse({
        limit: 6,
        ...query,
        ...(sortedQuery && { sort: sortedQuery }),
        ...(keyword && { keyword: keyword }),
      });
      setFilterdNoticeList(res);
      setPageCount(res.count);
      console.log(res);
    }
    setSortedAdvancedQuery(query);
    setPrevSortedAdvancedQuery(sortedAdvancedQuery);
  };

  useEffect(() => {
    setFilterSelected("마감임박순");
    setSortedQuery(null);
    setSortedAdvancedQuery(null);
    const getFirstNoticeData = async () => {
      setIsLoading(true);
      await getFilterdNoticeData({
        limit: 6,
        ...(keyword && { keyword: keyword }),
      });
      setIsLoading(false);
    };
    getFirstNoticeData();
  }, [keyword]);

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
  }, [filterSelected, keyword]);

  useEffect(() => {
    const executeAdvancedFilter = () => {
      if (
        sortedAdvancedQuery !== prevSortedAdvancedQuery &&
        sortedAdvancedQuery
      ) {
        setIsAdvancedFilterChanged(true);
        handleAdvencedFilterSubmit(sortedAdvancedQuery);
      } else {
        setIsAdvancedFilterChanged(false);
      }
    };

    executeAdvancedFilter();
  }, [sortedAdvancedQuery, prevSortedAdvancedQuery, keyword]);

  return (
    <section className="flex justify-center py-[60px] mob:py-10">
      <div className=" mx-auto flex w-[964px] flex-col items-center">
        <div
          id="filterdNoticeSection"
          className="flex w-full justify-between pb-[31px] text-left tracking-[0.56px] mob:flex-col mob:gap-4 mob:pb-3"
        >
          <h1 className="text-[28px] font-bold mob:text-xl">
            {keyword !== undefined ? (
              <>
                {keyword === "" ? (
                  <>
                    <span className="text-primary">{`전체 `}</span>
                    공고목록
                  </>
                ) : (
                  <>
                    <span className="text-primary">{keyword}</span>에 대한
                    공고목록
                  </>
                )}
              </>
            ) : (
              `전체공고`
            )}
          </h1>
          <div className="flex h-[42px] items-center gap-[10px]">
            <BasicFilter
              filterSelected={filterSelected}
              onFilterSelectedClick={handleFilterSelectedClick}
            />
            <AdvancedFilterComponent
              keyword={keyword}
              onAdvencedFilterSubmit={handleAdvencedFilterSubmit}
            />
          </div>
        </div>
        <FilterdNotice
          keyword={keyword}
          isLoading={isLoading}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setIsFilterChanged={setIsFilterChanged}
          isFilterChanged={isFilterChanged}
          isAdvancedFilterChanged={isAdvancedFilterChanged}
          sortedAdvancedQuery={sortedAdvancedQuery}
          prevSortedAdvancedQuery={prevSortedAdvancedQuery}
          sortedQuery={sortedQuery}
          filterdNoticeList={filterdNoticeList}
          setFilterdNoticeList={setFilterdNoticeList}
        />
      </div>
    </section>
  );
};

export default NoticeMain;

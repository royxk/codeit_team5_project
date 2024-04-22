import React from "react";
import BasicFilter from "./BasicFilter";
import AdvancedFilterComponent from "../common/AdvancedFilter/AdvancedFilterComponent";
import FilterdNotice from "./FilterdNotice";

type Props = {};

const NoticeMain = (props: Props) => {
  return (
    <section className="flex justify-center py-[60px]">
      <div className="flex max-w-[964px] flex-col items-center">
        <div className="flex w-full justify-between pb-[31px] text-left  tracking-[0.56px]">
          <h1 className="text-[28px] font-bold">전체공고</h1>
          <div className="flex h-[42px] items-center gap-[10px]">
            <BasicFilter />
            <AdvancedFilterComponent />
          </div>
        </div>
        <FilterdNotice />
      </div>
    </section>
  );
};

export default NoticeMain;

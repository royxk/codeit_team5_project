"use client";
import React from "react";
import EmployerTable from "@/components/common/EmployerTable";
import StoreDetail from "@/components/common/StoreDetail";

type Props = {};

const EmployerNoticeDetail = (props: Props) => {
  return (
    <>
      <div className="mx-auto max-w-[64.25rem] px-8 py-[3.75rem]">
        <StoreDetail />
      </div>
      <div className="mx-auto max-w-[64.25rem] px-8 py-[3.75rem]">
        <EmployerTable />
      </div>
    </>
  );
};

export default EmployerNoticeDetail;

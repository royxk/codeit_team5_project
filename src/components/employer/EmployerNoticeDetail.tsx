"use client";
import React, { useEffect, useState } from "react";
import EmployerTable from "@/components/common/EmployerTable";
import StoreDetail from "@/components/common/StoreDetail";
import { searchSelectedNoticeApiResponse } from "@/util/api";
import { getCookie } from "@/util/cookieSetting";
import useNoticeId from "./Hook/useNoticeId";

type Props = {};

const EmployerNoticeDetail = () => {
  const [noticeData, setNoticeData] = useState();

  const shopId = getCookie("sid")!;
  const noticeId = useNoticeId()!;

  async function handleNoticeData() {
    const noticeData = await searchSelectedNoticeApiResponse(shopId, noticeId);
    setNoticeData(noticeData);
  }

  useEffect(() => {
    handleNoticeData();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[64.25rem] px-8 py-[3.75rem]">
        <StoreDetail data={noticeData} />
      </div>
      <div className="mx-auto max-w-[64.25rem] px-8 py-[3.75rem]">
        <EmployerTable />
      </div>
    </>
  );
};

export default EmployerNoticeDetail;

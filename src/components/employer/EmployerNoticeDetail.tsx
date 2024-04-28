"use client";
import React, { useEffect, useState } from "react";
import NoticeDetail from "@/components/common/NoticeDetail";
import { searchSelectedNoticeApiResponse } from "@/util/api";
import EmployerTable from "@/components/common/EmployerTable";
import { getCookie } from "@/util/cookieSetting";
import useNoticeId from "./Hook/useNoticeId";

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
        <NoticeDetail data={noticeData} />
      </div>
      <div className="mx-auto max-w-[64.25rem] px-8 py-[3.75rem]">
        <EmployerTable noticeId={noticeId} />
      </div>
    </>
  );
};

export default EmployerNoticeDetail;

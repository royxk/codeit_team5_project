"use client";
import {
  EmployerTableData,
  convertEmployerTableData,
} from "@/util/convertData";
import Table from "./Table";
import { searchSelectedNoticeApplyApiResponse } from "@/util/api";
import { getCookie } from "@/util/cookieSetting";
import { useEffect, useState } from "react";

const EMPLOYER_TABLE_HEADER = ["신청자", "소개", "전화번호", "상태"];

type ApplicantListApiResponse = {
  items: {
    item: {
      id: string;
      status: string;
      user: {
        item: {
          id: string;
          name?: string; // optional
          phone?: string; // optional
          bio?: string; // optional
        };
      };
    };
  }[];
};

const EmployerTable = ({ noticeId }: { noticeId?: string }) => {
  const [rawEmployerData, setRawEmployerData] =
    useState<ApplicantListApiResponse>();
  const shopId = getCookie("sid")!;

  const employerData: EmployerTableData[] =
    convertEmployerTableData(rawEmployerData);

  async function handleApplyData() {
    if (noticeId) {
      const res: ApplicantListApiResponse =
        await searchSelectedNoticeApplyApiResponse(shopId, noticeId);
      setRawEmployerData(res);
    }
  }

  useEffect(() => {
    handleApplyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return employerData.length ? (
    <Table<EmployerTableData>
      headerData={EMPLOYER_TABLE_HEADER}
      applyData={employerData}
    />
  ) : (
    <div className="flex h-[400px] w-full max-w-[964px] flex-col items-center justify-center rounded-lg border border-gray-20 mob:text-sm">
      <p className="text-xl text-gray-50">아직 지원자가 없어요.</p>
    </div>
  );
};

export default EmployerTable;

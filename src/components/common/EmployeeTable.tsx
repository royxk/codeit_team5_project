"use client";
import {
  ApplyListApiResponse,
  EmployeeTableData,
  convertEmployeeTableData,
} from "@/util/convertData";
import { searchUserApplyApiResponse } from "@/util/api";
import { useEffect, useState } from "react";
import { getCookie } from "@/util/cookieSetting";
import Table from "./Table";
import Button from "./Button";
import Link from "next/link";

const EMPLOYEE_TABLE_HEADER = ["가게", "일자", "시급", "상태"];

const EmployeeTable = () => {
  const [applyData, setApplyData] = useState<ApplyListApiResponse>();
  const employeeData: EmployeeTableData[] = convertEmployeeTableData(applyData);

  const userId = getCookie("uid");

  async function getApplyData(userId: string | undefined) {
    if (!userId) return;
    const countData = await searchUserApplyApiResponse(userId, { limit: 1 });
    const data = await searchUserApplyApiResponse(userId, {
      limit: countData.count,
    });
    return data;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getApplyData(userId);
      setApplyData(data);
    };
    fetchUserData();
  }, [userId]);

  return employeeData.length ? (
    <Table<EmployeeTableData>
      headerData={EMPLOYEE_TABLE_HEADER}
      applyData={employeeData}
    />
  ) : (
    <div className="flex w-full max-w-[964px] flex-col items-center gap-6 rounded-lg border border-gray-20 px-6 py-[60px] mob:gap-4 mob:text-sm">
      <p className="text-black">아직 신청 내역이 없어요.</p>
      <Link href="/">
        <Button
          size="large"
          color="red"
          className="mob:px-5 mob:py-[10px] mob:text-sm"
        >
          공고 보러가기
        </Button>
      </Link>
    </div>
  );
};

export default EmployeeTable;

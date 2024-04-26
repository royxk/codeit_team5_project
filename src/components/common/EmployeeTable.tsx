import { SHOP_APPLY_API_RESPONSE_DATA } from "@/util/constants/table_mock_data";
import { EmployeeTableData, convertEmployeeTableData } from "@/util/convertData";
import Table from "./Table";
import Button from "./Button";
import Link from "next/link";
import { getServerSideCookie } from "@/app/utils/serverCookies";
import { searchUserApplyApiResponse } from "@/util/api";

const EMPLOYEE_TABLE_HEADER = ['가게', '일자', '시급', '상태'];

const getServerSideData = async () => {
  const uid = getServerSideCookie("uid");
  if (uid) {
    const applyData = await searchUserApplyApiResponse(uid);
    return applyData;
  }
  return;
}

const EmployeeTable = async () => {
  const applyData = await getServerSideData();
  const employeeData: EmployeeTableData[] = convertEmployeeTableData(applyData);

  return (
    employeeData.length ? <Table<EmployeeTableData> headerData={EMPLOYEE_TABLE_HEADER} applyData={employeeData} />
    :
    <div className="flex flex-col items-center gap-6 w-full max-w-[964px] border border-gray-20 rounded-lg px-6 py-[60px] mob:text-sm mob:gap-4">
      <p className="text-black">아직 신청 내역이 없어요.</p>
      <Link href="/">
        <Button size="large" color="red" className="mob:px-5 mob:py-[10px] mob:text-sm">공고 보러가기</Button>
      </Link>
    </div>
  );
}

export default EmployeeTable;
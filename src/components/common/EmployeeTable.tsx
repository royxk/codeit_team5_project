import { SHOP_APPLY_API_RESPONSE_DATA } from "@/util/constants/table_mock_data";
import { EmployeeTableData, convertEmployeeTableData } from "@/util/convertData";
import Table from "./Table";
import Button from "./Button";
import Link from "next/link";

const EMPLOYEE_TABLE_HEADER = ['가게', '일자', '시급', '상태'];

const EmployeeTable = () => {
  const employeeData: EmployeeTableData[] = convertEmployeeTableData(SHOP_APPLY_API_RESPONSE_DATA);

  return (
    employeeData.length ? <Table<EmployeeTableData> headerData={EMPLOYEE_TABLE_HEADER} applyData={employeeData} />
    :
    <div className="flex flex-col items-center gap-6 w-full max-w-[964px] border border-gray-20 rounded-lg px-6 py-[60px] mob:text-sm">
      <p className="text-black">아직 신청 내역이 없어요.</p>
      <Link href="/">
        <Button size="large" color="red">공고 보러가기</Button>
      </Link>
    </div>
  );
}

export default EmployeeTable;
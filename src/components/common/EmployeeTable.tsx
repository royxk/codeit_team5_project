import { API_RESPONSE_DATA } from "@/app/test/page";
import { ConvertApplyShopData, convertApplyShopData } from "@/util/convertData";
import Table from "./Table";

interface EmployeeTableProps extends ConvertApplyShopData {};

const EMPLOYEE_TABLE_HEADER = ['가게', '일자', '시급', '상태'];

const EmployeeTable = () => {
  const employeeData: EmployeeTableProps[] = convertApplyShopData(API_RESPONSE_DATA);
  return <Table<EmployeeTableProps> headerData={EMPLOYEE_TABLE_HEADER} applyData={employeeData} />
}

export default EmployeeTable;
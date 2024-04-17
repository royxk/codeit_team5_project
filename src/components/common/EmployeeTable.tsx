import { SHOP_APPLY_API_RESPONSE_DATA } from "@/util/constants/table_mock_data";
import { ConvertApplyShopData, convertApplyShopData } from "@/util/convertData";
import Table from "./Table";

interface EmployeeTableProps extends ConvertApplyShopData {};

const EMPLOYEE_TABLE_HEADER = ['가게', '일자', '시급', '상태'];

const EmployeeTable = () => {
  const employeeData: EmployeeTableProps[] = convertApplyShopData(SHOP_APPLY_API_RESPONSE_DATA);
  return <Table<EmployeeTableProps> headerData={EMPLOYEE_TABLE_HEADER} applyData={employeeData} />
}

export default EmployeeTable;
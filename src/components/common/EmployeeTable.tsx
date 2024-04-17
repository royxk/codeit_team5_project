import { API_RESPONSE_DATA } from "@/app/test/page";
import { ConvertApplyShopData, convertApplyShopData } from "@/util/convertData";
import Table from "./Table";

interface EmployeeTableProps extends ConvertApplyShopData {};

const EmployeeTable = () => {
  const employeeData: EmployeeTableProps[] = convertApplyShopData(API_RESPONSE_DATA);
  return <Table<EmployeeTableProps> pageType="employee" applyData={employeeData} />
}

export default EmployeeTable;
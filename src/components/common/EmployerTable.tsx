import { EmployerTableData, convertApplicantData } from "@/util/convertData";
import { USER_API_RESPONSE } from "@/util/constants/table_mock_data";
import Table from "./Table";

const EMPLOYER_TABLE_HEADER = ['신청자', '소개', '전화번호', '상태'];

const EmployerTable = () => {
  const employerData: EmployerTableData[] = convertApplicantData(USER_API_RESPONSE);
  return <Table<EmployerTableData> headerData={EMPLOYER_TABLE_HEADER} applyData={employerData} />
}

export default EmployerTable;
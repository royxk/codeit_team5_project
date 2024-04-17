import { ConvertApplicantData, convertApplicantData } from "@/util/convertData";
import { USER_API_RESPONSE } from "@/util/constants/table_mock_data";
import Table from "./Table";

interface EmployerTableProps extends ConvertApplicantData {};

const EMPLOYER_TABLE_HEADER = ['신청자', '소개', '전화번호', '상태'];

const EmployerTable = () => {
  const employerData: EmployerTableProps[] = convertApplicantData(USER_API_RESPONSE);
  return <Table headerData={EMPLOYER_TABLE_HEADER} applyData={employerData} />
}

export default EmployerTable;
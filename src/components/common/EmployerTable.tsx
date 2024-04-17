import { ConvertApplicantData, convertApplicantData } from "@/util/convertData";
import { USER_API_RESPONSE } from "@/app/test/page";
import Table from "./Table";

interface EmployerTableProps extends ConvertApplicantData {};

const EmployerTable = () => {
  const employerData: EmployerTableProps[] = convertApplicantData(USER_API_RESPONSE);
  return <Table<EmployerTableProps> pageType="employer" applyData={employerData} />
}

export default EmployerTable;
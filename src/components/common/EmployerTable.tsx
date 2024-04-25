import { EmployerTableData, convertEmployerTableData } from "@/util/convertData";
import { USER_API_RESPONSE } from "@/util/constants/table_mock_data";
import Table from "./Table";
import { getServerSideCookie } from "@/app/utils/serverCookies";
import { searchSelectedNoticeApplyApiResponse } from "@/util/api";

const EMPLOYER_TABLE_HEADER = ['신청자', '소개', '전화번호', '상태'];

// 공고 상세 페이지 개설 시 할 예정
// const getServerSideData = async () => {
//   const sid = getServerSideCookie("sid");
//   const noticeId = '';
//   if (sid) {
//     const applyData = await searchSelectedNoticeApplyApiResponse(sid, noticeId);
//     return applyData;
//   }
//   return;
// }

const EmployerTable = () => {
  const employerData: EmployerTableData[] = convertEmployerTableData(USER_API_RESPONSE);
  
  return (
    employerData.length ? <Table<EmployerTableData> headerData={EMPLOYER_TABLE_HEADER} applyData={employerData} />
    :
    <div className="flex flex-col justify-center items-center w-full max-w-[964px] h-[400px] border border-gray-20 rounded-lg mob:text-sm">
      <p className="text-gray-50 text-xl">아직 지원자가 없어요.</p>
    </div>
  );
}

export default EmployerTable;
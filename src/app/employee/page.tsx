import Button from "@/components/common/Button";
import EmployeeTable from "@/components/common/EmployeeTable";
import Link from "next/link";

const Employee = () => {
  return( 
    <>
      <div className="flex flex-col justify-start items-center w-full">
        <header className="flex flex-col gap-6 py-[60px]">
          <h1 className="h1">내 프로필</h1>
          <div>
            <div className="flex flex-col items-center gap-6 w-[964px] border border-gray-20 rounded-lg px-6 py-[60px] tab:w-[632px] mob:text-sm mob:w-[350px]">
              <p className="text-black">내 프로필을 등록하고 원하는 가게에 지원해 보세요</p>
              <Link href="/employee/my-profile">
                <Button size="large" color="red" className="mob:px-5 py-[10px] text-sm">내 프로필 등록하기</Button>
              </Link>
            </div>
          </div>
        </header>
      </div>
      <div className="flex flex-col justify-start items-center bg-gray-5 pt-[60px] pb-[120px]">
        <div className="flex flex-col gap-8 tab:w-[632px] mob:w-[350px]">
          <h1 className="h1">신청 내역</h1>
          <EmployeeTable />
        </div>
      </div>
    </>
  );
};

export default Employee;

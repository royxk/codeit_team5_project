import { getServerSideCookie } from "../../utils/serverCookies";
import { mydataApiResponse } from "@/util/api";
import { redirect } from "next/navigation";
import EmployeeTable from "@/components/common/EmployeeTable";
import ProfileHeader from "@/components/ProfileDetail/profileHeader";

const getServerSideData = async () => {
  const uid = getServerSideCookie("uid");
  if (uid) {
    const { item } = await mydataApiResponse(uid);
    return { uid, item };
  }
  return { uid, item: {} };
};

const Employee = async () => {
  const { uid, item } = await getServerSideData();
  const isProfileData = Object.keys(item).length <= 4;

  if (!uid) {
    redirect("/signin");
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start">
        <header
          className={`flex flex-col gap-6 py-[60px] mob:py-10 
          ${isProfileData ? "mb-[459px] tab:mb-[568px] mob:mb-[269px]" : "mob:gap-4"}`}
        >
          <h1 className="h1 mob:h2">내 프로필</h1>
          <ProfileHeader isProfileData={isProfileData} />
        </header>
      </div>
      {!isProfileData && (
        <div className="flex flex-col items-center justify-start bg-gray-5 pb-[120px] pt-[60px] tab:-mx-8 mob:-mx-3 mob:pb-20 mob:pt-10">
          <div className="flex w-[964px] flex-col gap-8 tab:w-[632px] mob:w-[350px] mob:gap-4">
            <h1 className="h1 mob:h2">신청 내역</h1>
            <EmployeeTable />
          </div>
        </div>
      )}
    </>
  );
};

export default Employee;

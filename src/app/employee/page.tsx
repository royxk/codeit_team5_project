import Button from "@/components/common/Button";
import EmployeeTable from "@/components/common/EmployeeTable";
import Image from "next/image";
import Link from "next/link";
import phoneIcon from "/public/Icon_phone.svg";
import locationIcon from "/public/post/location.svg";
import { USER_TEST_DATA } from "@/util/constants/PROFILE_PAGE_USER_TEST_DATA";

const Employee = () => {
  const isProfileData = Object.keys(USER_TEST_DATA.item).length <= 3;

  return( 
    <>
      <div className="flex flex-col justify-start items-center w-full">
        {isProfileData ?
          <header className="flex flex-col gap-6 py-[60px] mb-[459px] tab:mb-[568px] mob:mb-[269px] mob:py-10">
            <h1 className="h1 mob:h2">내 프로필</h1>
            <div className="flex flex-col items-center gap-6 w-[964px] border border-gray-20 rounded-lg px-6 py-[60px] tab:w-[632px] mob:text-sm mob:w-[350px]">
              <p className="text-black">내 프로필을 등록하고 원하는 가게에 지원해 보세요</p>
              <Link href="/employee/my-profile">
                <Button size="large" color="red" className="mob:px-5 py-[10px] text-sm">내 프로필 등록하기</Button>
              </Link>
            </div>
          </header>
        :
          <header className="flex flex-col gap-6 py-[60px] mob:gap-4">
            <h1 className="h1 mob:h2">내 프로필</h1>
            <div className="relative flex flex-col gap-[28px] w-[964px] bg-red-10 border-none rounded-lg p-8 tab:w-[632px] mob:text-sm mob:w-[350px] mob:p-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <span className="body1-bold text-primary">이름</span>
                  <h1 className="h1 text-black">김승우</h1>
                </div>
                <Link href='/employee/my-profile'>
                  <Button size="medium" color="white" className="absolute top-8 right-8">편집하기</Button>
                </Link>
                <div className="flex gap-[6px] text-gray-50">
                  <Image src={phoneIcon} alt="phone-icon" />
                  <span className="body1">010-1234-5678</span>
                </div>
                <div className="flex gap-[6px] text-gray-50">
                  <Image src={locationIcon} alt="location-icon" />
                  <span className="body1">선호 지역: 서울시 도봉구</span>
                </div>
              </div>
              <p className="body1 text-black">열심히 일 하겠습니다.</p>
            </div>
          </header>
        }
      </div>
    {!isProfileData && 
      <div className="flex flex-col justify-start items-center bg-gray-5 pt-[60px] pb-[120px]">
        <div className="flex flex-col gap-8 tab:w-[632px] mob:w-[350px] mob:gap-4">
          <h1 className="h1 mob:h2">신청 내역</h1>
          <EmployeeTable />
        </div>
      </div>
    }
  </>
  );
};

export default Employee;

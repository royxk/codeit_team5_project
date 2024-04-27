'use client';
import { useEffect, useState } from 'react';
import { mydataApiResponse } from '@/util/api';
import { getCookie } from '@/util/cookieSetting';
import { UserItem } from '@/util/constants/PROFILE_PAGE_USER_TEST_DATA';
import Button from '../common/Button';
import Link from 'next/link';
import Image from 'next/image';
import phoneIcon from "/public/Icon_phone.svg";
import locationIcon from "/public/post/location.svg";

interface ProfileHeaderProps {
  isProfileData: boolean;
}

const ProfileHeader = ({ isProfileData }: ProfileHeaderProps) => {
  const [userData, setUserData] = useState<UserItem | null>(null);
  const userId = getCookie("uid");

  async function getUserData(userId: string | undefined) {
    if (!userId) return;
    const { item } = await mydataApiResponse(userId);
    return item;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData(userId);
      setUserData(data);
    };
    fetchUserData();
  }, [userId])


  return (
    isProfileData ?
      <div className="flex flex-col items-center gap-6 w-[964px] border border-gray-20 rounded-lg px-6 py-[60px] tab:w-[632px] mob:text-sm mob:w-[350px]">
        <p className="text-black">내 프로필을 등록하고 원하는 가게에 지원해 보세요</p>
        <Link href="/employee/my-profile">
          <Button size="large" color="red" className="mob:px-5 mob:py-[10px] mob:text-sm">내 프로필 등록하기</Button>
        </Link>
      </div>
    :
    <div className="relative">
      <div className="flex flex-col gap-5 w-[964px] h-[256px] bg-red-10 border-none rounded-lg p-6 tab:w-[632px] mob:text-sm mob:w-[350px] mob:max-h-[216px] mob:p-5 mob:gap-3">
        <div className="flex flex-col gap-3 mob:gap-2">
          <div className="flex flex-col gap-2">
            <span className="body1-bold text-primary mob:text-sm">이름</span>
            <h1 className="h1 text-black mob:h2">{userData?.name}</h1>
          </div>
          <div className="flex gap-[6px] text-gray-50">
            <Image className="mob:w-4" src={phoneIcon} alt="phone-icon" />
            <span className="body1 mob:body2">{userData?.phone}</span>
          </div>
          <div className="flex gap-[6px] text-gray-50">
            <Image className="mob:w-4" src={locationIcon} alt="location-icon" />
            <div className="body1 mob:body2">{userData?.address && `선호 지역: ${userData.address}`}</div>
          </div>
        </div>
        <p className="body1 text-black overflow-y-auto leading-tight h-10 hide-scrollbar mob:body2 mob:leading-tight">{userData?.bio}</p>
      </div>
      <Link href='/employee/my-profile'>
        <Button size="medium" color="white" className="absolute top-8 right-8 text-base px-[55px] py-[14px] mob:px-5 mob:py-[10px] mob:top-5 mob:right-5 mob:font-bold mob:text-sm">
          편집하기
        </Button>
      </Link>
    </div>
  );
};

export default ProfileHeader;
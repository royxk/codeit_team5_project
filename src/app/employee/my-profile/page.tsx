"use client"
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Address, mydataApiResponse, mydataEditApiResponse } from '@/util/api';
import { getCookie } from '@/util/cookieSetting';
import { UserItem } from '@/util/constants/PROFILE_PAGE_USER_TEST_DATA';
import { INPUT_SELECT_DATA_LIST, INPUT_SELECT_TYPE } from '@/util/constants/INPUT_VALUES';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Image from 'next/image';
import closeIcon from '/public/close.svg';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';

const RegisterProfile = () => {
  const [userData, setUserData] = useState<UserItem | null>(null);
  const [isProfileData, setIsProfileData] = useState(true);
  const [addressValue, setAddressValue] = useState(userData?.address);
  const [bioValue, setBioValue] = useState(userData?.bio);
  const [phonErr, setPhoneErr] = useState('');
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneNumRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const userId = getCookie("uid");

  async function getUserData(userId: string | undefined) {
    if (!userId) return;
    const { item } = await mydataApiResponse(userId);
    return item;
  }

  useEffect(() => {
    if (!userId) router.push('/signin');
    const fetchUserData = async () => {
      const data = await getUserData(userId);
      setUserData(data);
    };
    fetchUserData();
    if(userData) {
      if (Object.keys(userData).length <= 4) {
        setIsProfileData(false);
      }
      setIsProfileData(true);
    }
  }, [userId, router, userData]);

  const handleClick = () => {
    router.push('/employee');
  }

  //phoneNum의 포커스가 사라질 때, 자동으로 '-'을 넣어주는 함수.
  const handleBlur = (target: string | undefined) => {
    if (!target) return;

    const phoneNum = target.replace(/\D/g, '');
    const formattedValue = formatPhoneNumber(phoneNum);

    (phoneNum.length < 10 || phoneNum.slice(0, 3) !== '010')
    ? setPhoneErr("INVALID_PHONE_NUMBER")
    : setPhoneErr('');

    
    if(phoneNumRef.current) {
      phoneNumRef.current.value = formattedValue;
    }
  }

  const handleSelect = (data: string) => {
    setAddressValue(data);
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBioValue(e.target.value)
  }

  const handleSubmit = async () => {
    const editValue = {
      name: nameRef.current?.value ?? "",
      phone: phoneNumRef.current?.value ?? "",
      address: addressValue as Address ?? userData?.address,
      bio: bioValue as string,
    }

    await mydataEditApiResponse(editValue);
    router.push('/employee');
  }

  return (
    <>
      <div className='flex flex-col items-center gap-8 py-[60px] bg-gray-5 min-h-[calc(100vh-170px)] tab:pb-[278px] mob:pb-20 tab:-mx-8 mob:-mx-3'>
        <div className='flex justify-between w-[964px] tab:w-[632px] mob:w-[350px]'>
          <h1 className='h1 mob:h3'>내 프로필</h1>
          <button type='button' onClick={handleClick}>
            <Image src={closeIcon} className='w-8 mob:w-6' alt='closeBtn'/>
          </button>
        </div>
        <form className='grid grid-cols-3 gap-5 w-[964px] tab:grid-cols-2 tab:w-[632px] mob:grid-cols-1 mob:w-[350px]'>
          <div>
            <Input inputType="NAME" inputRef={nameRef} defaultValue={userData?.name}/>
          </div>
          <div>
            <Input
              inputType="PHONE_NUMBER"
              inputRef={phoneNumRef}
              errorType={phonErr}
              blurEvent={() => handleBlur(phoneNumRef.current?.value)}
              defaultValue={userData?.phone}/>
          </div>
          <div>
            <Input
              inputType={INPUT_SELECT_TYPE[2]}
              dataArray={INPUT_SELECT_DATA_LIST.MAIN_ADDRESS}
              selectData={handleSelect}
              defaultValue={userData?.address}
            />
          </div>
          <div className='col-span-3 flex flex-col gap-2 tab:col-span-2 mob:col-span-1'>
            <label>소개</label>
            <textarea
              className='w-full border border-gray-30 rounded-lg h-40 px-5 py-4 focus:outline-none focus:border-blue-20'
              placeholder='자기 소개를 입력해 주세요.'
              onChange={handleChange}
              value={bioValue}
            />
          </div>
        </form>
        <Button size='large' color='red' onClick={handleSubmit}>{isProfileData ? '수정하기' : '등록하기' }</Button>
      </div>
    </>
  );
};

export default RegisterProfile;
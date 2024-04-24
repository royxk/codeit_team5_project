'use client';
import { INPUT_SELECT_DATA_LIST, INPUT_SELECT_TYPE } from '@/util/constants/INPUT_VALUES';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Image from 'next/image';
import closeIcon from '/public/close.svg';
import { USER_TEST_DATA } from '@/util/constants/PROFILE_PAGE_USER_TEST_DATA';

const RegisterProfile = () => {
  const router = useRouter();
  const isProfileData = Object.keys(USER_TEST_DATA.item).length <= 3;
  const handleClick = () => {
    router.push('/employee');
  }

  return (
    <>
      <div className='flex flex-col items-center gap-8 py-[60px] bg-gray-5 tab:pb-[278px] mob:pb-20'>
        <div className='flex justify-between w-[964px] tab:w-[632px] mob:w-[350px]'>
          <h1 className='h1 mob:h3'>내 프로필</h1>
          <button type='button' onClick={handleClick}>
            <Image src={closeIcon} className='w-8 mob:w-6' alt='closeBtn'/>
          </button>
        </div>
        <form className='grid grid-cols-3 gap-5 w-[964px] tab:grid-cols-2 tab:w-[632px] mob:grid-cols-1 mob:w-[350px]'>
          <div>
            <Input inputType="NAME"/>
          </div>
          <div>
            <Input inputType="PHONE_NUMBER"/>
          </div>
          <div>
            <Input inputType={INPUT_SELECT_TYPE[2]} dataArray={INPUT_SELECT_DATA_LIST.MAIN_ADDRESS} />
          </div>
          <div className='col-span-3 flex flex-col gap-2 tab:col-span-2 mob:col-span-1'>
            <label>소개</label>
            <textarea
              className='w-full border border-gray-30 rounded-lg h-40 px-5 py-4 focus:outline-none focus:border-blue-20'
              placeholder='자기 소개를 입력해 주세요.'
            />
          </div>
        </form>
        <Button size='large' color='red'>{isProfileData ? '등록하기' : '수정하기'}</Button>
      </div>
    </>
  );
};

export default RegisterProfile;
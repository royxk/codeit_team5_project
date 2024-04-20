import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { INPUT_SELECT_DATA_LIST, INPUT_SELECT_TYPE } from '@/util/constants/INPUT_VALUES';

const RegisterProfile = () => {
  return (
    <>
      <h1>프로필 navbar</h1>
      <div className='flex flex-col items-center gap-8 py-[60px]'>
        <div className='flex justify-between w-[964px]'>
          <h1 className='h1'>내 프로필</h1>
          <button>x버튼</button>
        </div>
        <form className='grid grid-cols-3 gap-5 w-[964px]'>
          <div>
            <Input inputType="NAME"/>
          </div>
          <div>
            <Input inputType="PHONE_NUMBER"/>
          </div>
          <div>
            <Input inputType={INPUT_SELECT_TYPE[2]} dataArray={INPUT_SELECT_DATA_LIST.MAIN_ADDRESS} />
          </div>
          <div className='col-span-3 flex flex-col gap-2'>
            <label>소개</label>
            <textarea
              className='w-full border border-gray-30 rounded-lg h-40 px-5 py-4 focus:outline-none focus:border-blue-20'
              placeholder='자기 소개를 입력해 주세요.'
            />
          </div>
        </form>
        <Button size='large' color='red'>등록하기</Button>
      </div>
    </>
  );
};

export default RegisterProfile;
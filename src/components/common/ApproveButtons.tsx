'use client';

const ApproveButtons = () => {
  const handleClick = () => {
    return alert('버튼 클릭!')
  }
  return (
    <div className='flex gap-3'>
      <button
        className='flex items-center bg-white text-red-40 border border-red-40 rounded-md px-5 h-[38px] py-[10px] font-bold text-sm hover:bg-red-10'
        type='button'
        onClick={handleClick}
      >
        거절하기
      </button>
      <button
        className='flex items-center bg-white text-blue-20 border border-blue-20 rounded-md h-[38px] px-5 py-[10px] font-bold text-sm hover:bg-blue-10'
        type='button'
        onClick={handleClick}
      >
        승인하기
      </button>
    </div>
  );
};

export default ApproveButtons;

interface StatusLabelProp {
}

const StatusLabel = (props: StatusLabelProp) => {
  return (
    <>
    <div className='bg-green-10 text-green-20 w-16 border-none rounded-[20px] text-center px-[10px] py-[6px] font-bold text-sm'>
      대기중
    </div>
    <div className='bg-blue-10 text-blue-20 w-20 border-none rounded-[20px] text-center px-[10px] py-[6px] font-bold text-sm'>
      승인 완료
    </div>
    <div className='bg-red-10 text-red-40 w-12 border-none rounded-[20px] text-center px-[10px] py-[6px] font-bold text-sm'>
      거절
    </div>
    <div className='flex gap-3'>
      <button type='button' className='flex items-center bg-white text-red-40 border border-red-40 rounded-md px-5 h-[38px] py-[10px] font-bold text-sm hover:bg-red-10'>
        거절하기
      </button>
      <button type='button' className='flex items-center bg-white text-blue-20 border border-blue-20 rounded-md h-[38px] px-5 py-[10px] font-bold text-sm hover:bg-blue-10'>
        승인하기
      </button>
    </div>
    </>
  );
};

export default StatusLabel;

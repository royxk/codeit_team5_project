'use client';
import { StatusBody, selectedNoticeApplyStatusSettingApiResponse } from "@/util/api";
import { useParams } from "next/navigation";
import { MouseEvent } from "react";

interface ApproveButtonsProps {
  noticeApplyId: string;
}

const ApproveButtons = ({ noticeApplyId }: ApproveButtonsProps) => {
  const { shopId, noticeId } = useParams<{ shopId: string; noticeId: string }>();
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const body = {
      "status": button.id,
    } as StatusBody
    // await selectedNoticeApplyStatusSettingApiResponse(shopId, noticeId, noticeApplyId, body);
    return alert(`거절하기 버튼 클릭! apply_id=${noticeApplyId} ${button.id}`)
  }

  return (
    <div className='flex gap-3 mob:gap-2'>
      <button
        id="rejected"
        className='flex items-center bg-white text-primary border border-primary rounded-md h-[38px] px-5 py-[10px] font-bold text-sm hover:bg-red-10 mob:font-normal mob:text-xs mob:px-3 mob:py-2 mob:h-8'
        type='button'
        onClick={handleClick}
      >
        거절하기
      </button>
      <button
        id="accepted"
        className='flex items-center bg-white text-blue-20 border border-blue-20 rounded-md h-[38px] px-5 py-[10px] font-bold text-sm hover:bg-blue-10 mob:font-normal mob:text-xs mob:px-3 mob:py-2 mob:h-8'
        type='button'
        onClick={handleClick}
      >
        승인하기
      </button>
    </div>
  );
};

export default ApproveButtons;

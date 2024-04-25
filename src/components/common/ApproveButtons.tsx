'use client';
import { StatusBody, selectedNoticeApplyStatusSettingApiResponse } from "@/util/api";
import { useParams } from "next/navigation";
import { MouseEvent, useState } from "react";
import Modal from "../signin/Modal";
import Button from "./Button";

interface ApproveButtonsProps {
  noticeApplyId: string;
}

const MODAL_MESSAGE = [
  "신청을 거절하시겠어요?",
  "신청을 승인하시겠어요?",
]

const ApproveButtons = ({ noticeApplyId }: ApproveButtonsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [reqBody, setReqBody] = useState({})
  const { shopId, noticeId } = useParams<{ shopId: string; noticeId: string }>();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const body = {
      "status": button.id,
    } as StatusBody
    setReqBody(body);
    setShowModal(true);
    button.id === "rejected" ? setModalMessage(MODAL_MESSAGE[0]) : setModalMessage(MODAL_MESSAGE[1]);
  }

  const handleYesBtnClick = async () => {
    setShowModal(false);
    // await selectedNoticeApplyStatusSettingApiResponse(shopId, noticeId, noticeApplyId, reqBody);
    console.log("리퀘스트 보냄!")
  }

  const handleNoBtnClick = () => {
    setShowModal(false);
  }

  return (
    <>
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
      {showModal && (
        <Modal onClose={handleNoBtnClick}>
          <div className="flex flex-col gap-8">
            <p className="text-center">{modalMessage}</p>
            <div className="flex gap-2">
              <Button
                color="white"
                size="small"
                onClick={handleNoBtnClick}
                className="h-[38px]"
              >
                아니오
              </Button>
              <Button
                color="red"
                size="small"
                onClick={handleYesBtnClick}
                className="h-[38px]"
              >
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
export default ApproveButtons;

"use client";
import {
  StatusBody,
  selectedNoticeApplyStatusSettingApiResponse,
} from "@/util/api";
import { useParams } from "next/navigation";
import { MouseEvent, useState } from "react";
import Modal from "./SignModal";
import Button from "./Button";

interface ApproveButtonsProps {
  noticeApplyId: string;
}

const MODAL_MESSAGE = ["신청을 거절하시겠어요?", "신청을 승인하시겠어요?"];

const ApproveButtons = ({ noticeApplyId }: ApproveButtonsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [reqBody, setReqBody] = useState({});
  const { shopId, noticeId } = useParams<{
    shopId: string;
    noticeId: string;
  }>();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const body = {
      status: button.id,
    } as StatusBody;
    setReqBody(body);
    setShowModal(true);
    button.id === "rejected"
      ? setModalMessage(MODAL_MESSAGE[0])
      : setModalMessage(MODAL_MESSAGE[1]);
  };

  const handleYesBtnClick = async () => {
    setShowModal(false);
    // await selectedNoticeApplyStatusSettingApiResponse(shopId, noticeId, noticeApplyId, reqBody);
    console.log("리퀘스트 보냄!");
  };

  const handleNoBtnClick = () => {
    setShowModal(false);
  };

  // 모달 컴포넌트 수정될 때까지 대기
  // const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
  //   setShowModal(false);
  // }

  return (
    <>
      <div className="flex gap-3 mob:gap-2">
        <button
          id="rejected"
          className="flex h-[38px] items-center rounded-md border border-primary bg-white px-5 py-[10px] text-sm font-bold text-primary hover:bg-red-10 mob:h-8 mob:px-3 mob:py-2 mob:text-xs mob:font-normal"
          type="button"
          onClick={handleClick}
        >
          거절하기
        </button>
        <button
          id="accepted"
          className="flex h-[38px] items-center rounded-md border border-blue-20 bg-white px-5 py-[10px] text-sm font-bold text-blue-20 hover:bg-blue-10 mob:h-8 mob:px-3 mob:py-2 mob:text-xs mob:font-normal"
          type="button"
          onClick={handleClick}
        >
          승인하기
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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
};
export default ApproveButtons;

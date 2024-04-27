"use client";
import {
  StatusBody,
  selectedNoticeApplyStatusSettingApiResponse,
} from "@/util/api";
import { useParams } from "next/navigation";
import { MouseEvent, useState } from "react";
import { getCookie } from "@/util/cookieSetting";
import Button from "./Button";
import Modal from "@/components/common/SignModal";
import ModalPortal from "./ModalPortal";

interface ApproveButtonsProps {
  noticeApplyId: string;
}

const MODAL_MESSAGE = ["신청을 거절하시겠어요?", "신청을 승인하시겠어요?"];

const ApproveButtons = ({ noticeApplyId }: ApproveButtonsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [reqBody, setReqBody] = useState<StatusBody>({ status: "canceled" });
  const { noticeId } = useParams<{noticeId: string;}>();
  const shopId = getCookie("sid");

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
    if (shopId) {
      await selectedNoticeApplyStatusSettingApiResponse(shopId, noticeId, noticeApplyId, reqBody);
    }
  };

  const handleNoBtnClick = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    setShowModal(false);
  }

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
        <ModalPortal>
          <Modal onClose={handleOutsideClick} type={"good"} className="max-w-[250px] max-h-[184px] p-6">
            <div className="flex flex-col gap-8">
              <p className="text-center font-normal">{modalMessage}</p>
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
        </ModalPortal>
      )}
    </>
  );
};
export default ApproveButtons;

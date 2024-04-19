import React from "react";

interface ModalProps {
  user: string;
}

const Modal: React.FC<ModalProps> = ({ user }) => {
  return (
    <div className="flex h-[183px] w-[298px] flex-col items-center justify-around rounded-[12px] bg-white">
      <div className="relative mt-[15px] h-[24px] w-[24px]">
        <img
          src="circleIcon.png"
          alt="circle icon"
          className="absolute left-[137px] top-[86px] h-[24px] w-[24px]"
        />
        {user === "a" ? (
          <img
            src="exclamation_markIcon.png"
            alt="exclamation_mark icon"
            className="absolute left-[148px] top-[91px] h-[13px] w-[12px]"
          />
        ) : (
          <img
            src="checkIcon.png"
            alt="check icon"
            className="absolute left-[143px] top-[92px] h-[12px] w-[12px]"
          />
        )}
      </div>
      <div className="mb-[20px] flex items-center justify-center text-[16px] font-bold text-[#111322]">
        {user === "a"
          ? "가게 정보를 먼저 등록해 주세요."
          : "신청을 거절하시겠어요?"}
      </div>
      <div>
        {user === "a" ? (
          <button className="m-[5px] h-[37px] w-[80px] gap-[8px] rounded-[6px] border border-[#ea3c12] bg-white px-[20px] font-bold text-[#ea3c12]">
            확인
          </button>
        ) : (
          <>
            <button className="m-[5px] h-[37px] w-[80px] gap-[8px] rounded-[6px] bg-[#ea3c12] px-[20px] font-bold text-white">
              아니오
            </button>
            <button className="m-[5px] h-[37px] w-[80px] gap-[8px] rounded-[6px] bg-[#ea3c12] px-[20px] font-bold text-white">
              예
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

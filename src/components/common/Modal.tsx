import Button from "@/components/common/Button";
import React from "react";

interface MoadlProps {
  user: string;
}

/**
 * Moadl 컴포넌트는 사용자에 따라 다른 내용을 표시하는 모달창을 렌더링합니다.
 * @param {Object} props - 컴포넌트에 전달되는 props 객체
 * @param {string} props.user - 사용자 식별자 (USER_NOT_REGISTERED[사용자가 가게 정보를 등록하지 않았을 경우] 또는 USER_REJECTED_APPLICATION[사용자가 신청을 거절할 경우])
 * @returns {JSX.Element} Moadl 컴포넌트의 JSX 요소
 */
const Moadl: React.FC<MoadlProps> = ({ user }) => {
  return (
    <div className="flex h-[183px] w-[298px] flex-col items-center justify-around rounded-[12px] bg-white">
      <div className="mt-15 h-6 w-6">
        <img
          className="absolute left-[137px] top-[20px] h-6 w-6"
          src="circleIcon.png"
          alt="circle icon"
        />

        {user === "USER_NOT_REGISTERED" ? (
          <img
            className="h-3.25 absolute left-[148px] top-[25px] w-0.5"
            src="exclamation_markIcon.png"
            alt="exclamation_mark icon"
          />
        ) : (
          <img
            className="absolute left-[143px] top-[26px] h-3 w-3"
            src="checkIcon.png"
            alt="check icon"
          />
        )}
      </div>
      {/* 사용자가 USER_NOT_REGISTERED일 경우 */}
      {user === "USER_NOT_REGISTERED" ? (
        <div className="mb-2 flex items-center justify-center text-base font-medium text-gray-800">
          {/* 사용자가 가게 정보를 등록하지 않았을 경우 메시지 */}
          가게 정보를 먼저 등록해 주세요.
        </div>
      ) : (
        /* 사용자가 USER_REJECTED_APPLICATION일 경우 */
        <div className="mb-2 flex items-center justify-center text-base font-medium text-gray-800">
          {/* 사용자가 신청을 거절할 경우 메시지 */}
          신청을 거절하시겠어요?
        </div>
      )}
      <div className="mb-2 flex items-center justify-center">
        {/* 사용자가 USER_NOT_REGISTERED일 경우 */}
        {user === "USER_NOT_REGISTERED" ? (
          <Button
            size="small"
            color="red"
            className="m-2 border border-primary bg-white px-5 py-2 font-bold text-[#ea3c12]"
          >
            확인
          </Button>
        ) : (
          /* 사용자가 USER_REJECTED_APPLICATION일 경우 */
          <>
            <Button
              size="small"
              color="red"
              className="m-2 border border-primary bg-white px-5 py-2 font-bold text-[#ea3c12]"
            >
              아니오
            </Button>
            <Button
              size="small"
              color="red"
              className="m-2 border border-primary bg-primary px-5 py-2 font-bold text-white"
            >
              예
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Moadl;

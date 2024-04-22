import React from "react";

interface MoadlProps {
  user: string;
}

const Moadl: React.FC<MoadlProps> = ({ user }) => {
  return (
    <div className="flex h-[183px] w-[298px] flex-col items-center justify-around rounded-[12px] bg-white">
      <div className="mt-15 h-6 w-6">
        <img
          className="absolute left-[137px] top-[20px] h-6 w-6"
          src="circleIcon.png"
          alt="circle icon"
        />

        {user === "a" ? (
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
      {user === "a" ? (
        <div className="mb-2 flex items-center justify-center text-base font-medium text-gray-800">
          가게 정보를 먼저 등록해 주세요.
        </div>
      ) : (
        <div className="mb-2 flex items-center justify-center text-base font-medium text-gray-800">
          신청을 거절하시겠어요?
        </div>
      )}
      <div className="mb-2 flex items-center justify-center">
        {user === "a" ? (
          <button
            type="button"
            className="m-1 flex h-9 w-20 items-center justify-center gap-2 rounded-md border border-[#ea3c12] bg-white px-5 py-2 text-[14px] font-bold text-[#ea3c12]"
          >
            확인
          </button>
        ) : (
          <>
            <button
              type="button"
              className="m-1 flex h-9 w-20 items-center justify-center gap-2 rounded-md border border-[#ea3c12] bg-white px-4 py-2 text-[14px] font-bold text-[#ea3c12]"
            >
              아니오
            </button>
            <button
              type="button"
              className="m-1 flex h-9 w-20 items-center justify-center gap-2 rounded-md bg-[#ea3c12] px-5 py-2 text-[14px] font-bold text-white"
            >
              예
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Moadl;

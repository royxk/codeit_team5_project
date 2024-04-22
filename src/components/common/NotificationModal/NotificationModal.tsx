import React from "react";
import Data from "@/util/constants/NOTIFICATION_MODAL_MOCK_DATA";
import NotificationModalMessageBox from "./NotificationModalMessageBox";

interface NotificationModalProps {
  onClick: () => void;
}

const NotificationModal = ({ onClick }: NotificationModalProps) => {
  return (
    <div
      className={`flex min-h-96 w-96 flex-col gap-5 rounded-xl border bg-red-10 px-5 py-6 tab:h-screen tab:w-full  tab:rounded-none tab:border-0`}
    >
      <div className={`flex flex-row justify-between`}>
        <div className={`text-xl font-bold `}>알림 6개</div>
        <button className={`select-none`} onClick={onClick}>
          닫기
        </button>
      </div>

      <div
        className={`flex max-h-96 flex-col gap-2 overflow-y-auto tab:max-h-full`}
      >
        {Data.map((data, index) => {
          return (
            <NotificationModalMessageBox
              state={data.state}
              message={data.message}
              time={data.time}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NotificationModal;

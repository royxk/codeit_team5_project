import React from "react";
import Data from "@/util/constants/NOTIFICATION_MODAL_MOCK_DATA";
import NotificationModalMessageBox from "./NotificationModalMessageBox";
import SvgCloseComponent from "./SvgCloseComponent";

interface NotificationModalProps {
  onClick: () => void;
}

const NotificationModal = ({ onClick }: NotificationModalProps) => {
  return (
    <div
      className={`flex min-h-96 w-96 flex-col gap-5 rounded-xl border border-gray-40  bg-red-10 px-5 py-6 mob:h-screen mob:w-full mob:rounded-none  mob:border-0 mob:pt-10`}
    >
      <div className={`flex flex-row justify-between`}>
        <div className={`text-xl font-bold `}>알림 6개</div>
        <div
          className={`hidden select-none mob:inline-block`}
          onClick={onClick}
        >
          <SvgCloseComponent />
        </div>
      </div>

      <div
        className={`flex max-h-96 flex-col gap-2 overflow-y-auto mob:max-h-full`}
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

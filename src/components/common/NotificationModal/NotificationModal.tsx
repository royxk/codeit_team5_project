import React from "react";
import NotificationModalMessageBox from "./NotificationModalMessageBox";
import SvgCloseComponent from "./SvgCloseComponent";
import { NOTIFICATION_API_ITEM_TYPE } from "./NOTIFICATION_API_RESPONSE_TYPE";

interface NotificationModalProps {
  data: NOTIFICATION_API_ITEM_TYPE[];
  onClick: (event: React.MouseEvent) => void;
  setStatus: (status: boolean) => void;
  getNotificationData: () => void;
}

const NotificationModal = ({
  getNotificationData,
  onClick,
  data,
}: NotificationModalProps) => {
  return (
    <div
      className={`flex min-h-96 w-96 flex-col gap-5 rounded-xl border border-gray-40  bg-red-10 px-5 py-6 mob:h-screen mob:w-full mob:rounded-none  mob:border-0 mob:pt-10`}
    >
      <div className={`flex flex-row justify-between`}>
        <div className={`text-xl font-bold `}>
          알림 {data ? data.length : 0}개
        </div>
        <div
          className={`hidden select-none mob:inline-block`}
          onClick={onClick}
        >
          <SvgCloseComponent />
        </div>
      </div>

      <div
        className={`flex max-h-96 flex-col gap-2 overflow-y-auto hide-scrollbar mob:max-h-full`}
      >
        {data.length == 0 ? (
          <div className="py-20 text-center">알림이 없습니다</div>
        ) : null}
        {data?.map((data) => {
          return (
            <NotificationModalMessageBox
              key={data.item.id}
              data={data}
              onClick={onClick}
              getNotificationData={getNotificationData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NotificationModal;

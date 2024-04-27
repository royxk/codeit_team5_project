import React from "react";
import Data from "@/util/constants/NOTIFICATION_MODAL_MOCK_DATA";
import NotificationModalMessageBox from "./NotificationModalMessageBox";
import SvgCloseComponent from "./SvgCloseComponent";
import { NOTIFICATION_API_RESPONSE_TYPE } from "./NOTIFICATION_API_RESPONSE_TYPE";

interface NotificationModalProps {
  data: NOTIFICATION_API_RESPONSE_TYPE | null | undefined;
  onClick: (event: React.MouseEvent) => void;
}

const NotificationModal = ({ onClick, data }: NotificationModalProps) => {
  const contents = data?.items;
  const count = data?.count;
  return (
    <div
      className={`flex min-h-96 w-96 flex-col gap-5 rounded-xl border border-gray-40  bg-red-10 px-5 py-6 mob:h-screen mob:w-full mob:rounded-none  mob:border-0 mob:pt-10`}
    >
      <div className={`flex flex-row justify-between`}>
        <div className={`text-xl font-bold `}>알림 {contents?.length}개</div>
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
        {count === 0 ? <div>데이터가 없습니다</div> : null}
        {contents?.map((data) => {
          return <NotificationModalMessageBox key={data.item.id} data={data} />;
        })}
      </div>
    </div>
  );
};

export default NotificationModal;

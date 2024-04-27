import React from "react";
import SvgStatusComponent from "./SvgStatusComponent";
import { NOTIFICATION_API_ITEM_TYPE } from "./NOTIFICATION_API_RESPONSE_TYPE";
import { formatApiDateData } from "@/util/formatDate";
import { elapsedTime } from "@/util/eplapsedTime";
import { alertReadApiResponse } from "@/util/api";
import { get } from "https";

type Props = {
  data: NOTIFICATION_API_ITEM_TYPE;
  onClick: (event: React.MouseEvent) => void;
  getNotificationData: () => void;
};

const NotificationRead = async (id: string) => {
  alertReadApiResponse(id);
  console.log("read", id);
};

const NotificationModalMessageBox = ({
  getNotificationData,
  data,
  onClick,
}: Props) => {
  const createdAt = formatApiDateData(
    data.item.notice.item.startsAt,
    data.item.notice.item.workhour,
  );
  return (
    <div
      className={`min-h-25 flex flex-col gap-1 rounded-xl border bg-white px-3 py-4 text-[14px] mob:min-h-24`}
      onClick={(event) => {
        NotificationRead(data.item.id);
        getNotificationData();
      }}
    >
      <SvgStatusComponent
        color={data.item.result === "rejected" ? "#FF0080" : "#0080FF"}
      />
      <div>
        {`${data.item.shop.item.name} (${createdAt[0]} ${createdAt[1]}) 공고지원이`}{" "}
        {data.item.result == `rejected` ? (
          <span className={`text-red-40`}>거절</span>
        ) : (
          <span className={`text-blue-20`}>승인</span>
        )}
        되었어요.
      </div>
      <div className={`text-xs text-gray-40`}>
        {elapsedTime(data.item.createdAt)}
        {data.item.read ? " 읽음" : " 안읽음"}
      </div>
    </div>
  );
};

export default NotificationModalMessageBox;

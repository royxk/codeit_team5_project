import React from "react";
import SvgStatusComponent from "./SvgStatusComponent";

type Props = {
  state: boolean;
  message: string;
  time: string;
};

const NotificationModalMessageBox = ({
  state = true,
  message,
  time,
}: Props) => {
  return (
    <div
      className={`flex min-h-24 flex-col gap-1 rounded-xl border bg-white px-3 py-4`}
    >
      <SvgStatusComponent color={state ? "#FF0000" : "#0080FF"} />
      <div>
        {message}{" "}
        {state ? (
          <span className={`${state ? "text-red-40" : "text-blue-20"}`}>
            거절
          </span>
        ) : (
          <span className={`${state ? "text-red-40" : "text-blue-20"}`}>
            승인
          </span>
        )}
      </div>
      <div className={`text-gray-30`}>{time}</div>
    </div>
  );
};

export default NotificationModalMessageBox;

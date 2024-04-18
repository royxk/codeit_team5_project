import React from "react";
import statusfalse from "../../../../public/NotificationModal/statusfalse.svg";
import statustrue from "../../../../public/NotificationModal/statustrue.svg";
import Image from "next/image";

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
      <Image
        src={state ? statustrue : statusfalse}
        alt="status"
        className={`w-1.5`}
      />
      <div>{message}</div>
      <div className={`text-gray-30`}>{time}</div>
    </div>
  );
};

export default NotificationModalMessageBox;

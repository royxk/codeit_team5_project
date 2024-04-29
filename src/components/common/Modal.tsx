import Image from "next/image";
import React, { ReactNode, MouseEvent } from "react";
import CIRCLE_ICON from "/public/circleIcon.png";
import EXCLAMATION_MARK_ICON from "/public/exclamation_markIcon.png";
import CHECK_ICON from "/public/checkIcon.png";

interface ModalProps {
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
  className?: string;
  iconStatus?: "success" | "warning";
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  className,
  iconStatus: type,
}) => {
  const handleNotCloseModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`${className} m-6 mb-4 flex h-[240px] w-[480px] flex-col items-center justify-center rounded-lg bg-white`}
        onClick={handleNotCloseModalClick}
      >
        <div className="relative">
          <Image
            className="flex"
            width={24}
            height={24}
            src={CIRCLE_ICON}
            alt="circle icon"
          />
          {type === "warning" ? (
            <Image
              className="relative bottom-[18px] left-[11px]"
              width={2}
              height={13}
              src={EXCLAMATION_MARK_ICON}
              alt="exclamation_mark icon"
            />
          ) : (
            <Image
              className="relative bottom-[17px] left-[6px]"
              width={12}
              height={12}
              src={CHECK_ICON}
              alt="check icon"
            />
          )}
        </div>
        <div className="mb-3 font-[460]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

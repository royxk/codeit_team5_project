import Image from "next/image";
import React, { ReactNode, MouseEvent } from "react";

interface ModalProps {
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
  className?: string;
  type?: "good" | "bad";
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  className,
  type,
}) => {
  const handleNotCloseModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 z-50 ml-2 mr-2 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`${className}m-6 mb-4 flex h-[240px] w-[480px] flex-col items-center justify-center rounded-lg bg-white pb-4`}
        onClick={handleNotCloseModalClick}
      >
        <div className="relative">
          <Image
            className="flex"
            width={24}
            height={24}
            src="/circleIcon.png"
            alt="circle icon"
          />
          {type === "good" ? (
            <Image
              className="relative bottom-[18px] left-[11px]"
              width={2}
              height={13}
              src="/exclamation_markIcon.png"
              alt="exclamation_mark icon"
            />
          ) : (
            <Image
              className="relative bottom-[17px] left-[6px]"
              width={12}
              height={12}
              src="/checkIcon.png"
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

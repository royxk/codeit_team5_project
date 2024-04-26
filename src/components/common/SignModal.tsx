import React, { ReactNode, MouseEvent } from "react";

interface ModalProps {
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, className }) => {
  const handleNotCloseModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 z-50 ml-2 mr-2 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`${className}m-6 flex h-[250px] w-[540px] items-center justify-center rounded-lg bg-white`}
        onClick={handleNotCloseModalClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

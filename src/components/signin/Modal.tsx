import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="m-6 flex h-[250px] w-[540px] items-center justify-center rounded-lg bg-white">
        {children}
      </div>
    </div>
  );
};

export default Modal;

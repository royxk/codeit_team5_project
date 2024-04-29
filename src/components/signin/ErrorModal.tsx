"use client";
import React from "react";
import Modal from "@/components/common/Modal";
import ModalPortal from "@/components/common/ModalPortal";
import Button from "@/components/common/Button";

interface ErrorModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  showModal,
  setShowModal,
  modalMessage,
}) => {
  return (
    <>
      {showModal && (
        <ModalPortal>
          <Modal iconStatus="warning" onClose={() => setShowModal(false)}>
            <div className="text-center">
              <p className="mt-7">{modalMessage}</p>
              <Button
                color="red"
                size="small"
                onClick={() => setShowModal(false)}
                className="relative left-[140px] top-[50px] h-[40px] w-[100px] text-[16px] font-[400]"
              >
                확인
              </Button>
            </div>
          </Modal>
        </ModalPortal>
      )}
    </>
  );
};

export default ErrorModal;

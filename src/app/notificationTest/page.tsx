"use client";
import NotificationModal from "@/components/common/NotificationModal/NotificationModal";
import React, { useState } from "react";

const NotificationTest = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  return (
    <div className={`relative content-end`}>
      <div className={`flex justify-end`}>
        <button onClick={toggleNotificationModal}>버튼</button>
        {isNotificationModalOpen && (
          <div
            className={`absolute right-5 ml-10 mt-10 tab:right-0 tab:m-0 tab:h-full tab:w-full`}
          >
            <NotificationModal onClick={toggleNotificationModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationTest;

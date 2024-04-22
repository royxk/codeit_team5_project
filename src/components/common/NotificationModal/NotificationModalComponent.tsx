"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import NotificationModal from "@/components/common/NotificationModal/NotificationModal";
import SvgNotificationButton from "./SvgNotificationButton";

const NotificationModalComponent = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleNotificationModal = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  // This function will be called to close the modal if clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      event.target instanceof Element &&
      !modalRef.current.contains(event.target)
    ) {
      setIsNotificationModalOpen(false);
    }
  };

  // Setup the event listener when the modal is open and clean it up when it closes
  useEffect(() => {
    if (isNotificationModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationModalOpen]); // Only re-run if the modal open state changes
  return (
    <div className={`relative z-50 content-end`}>
      <div className={`flex justify-end`} onClick={toggleNotificationModal}>
        <SvgNotificationButton status={false} />
        {isNotificationModalOpen && (
          <div
            ref={modalRef}
            className={`absolute top-8 ml-10 mt-10 tab:m-0 mob:right-0 mob:top-0 mob:h-full mob:w-full`}
          >
            <NotificationModal onClick={() => toggleNotificationModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModalComponent;

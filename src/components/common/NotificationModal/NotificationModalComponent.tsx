"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import NotificationModal from "@/components/common/NotificationModal/NotificationModal";
import SvgNotificationButton from "./SvgNotificationButton";
import { NOTIFICATION_API_RESPONSE_TYPE } from "./NOTIFICATION_API_RESPONSE_TYPE";

const NotificationModalComponent = ({
  data,
}: {
  data: NOTIFICATION_API_RESPONSE_TYPE | null | undefined;
}) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const content = data?.items.length;
  const toggleNotificationModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  // This function will be called to close the modal if clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !(event.target as Element).closest("#advanced-filter-modal")
    ) {
      setIsNotificationModalOpen(false);
    }
  };

  // Setup the event listener when the modal is open and clean it up when it closes
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Only re-run if the modal open state changes
  return (
    <div className={`relative z-[100] content-end`}>
      <div
        className={`flex justify-end`}
        id="advanced-filter-modal"
        onClick={toggleNotificationModal}
      >
        <SvgNotificationButton status={data == null} />
        {isNotificationModalOpen && (
          <div
            ref={modalRef}
            className={`absolute top-1 ml-10 mt-10 mob:fixed mob:right-0 mob:top-0 mob:mt-0 mob:h-screen mob:w-full`}
            onClick={(event) => event.stopPropagation()}
          >
            <NotificationModal data={data} onClick={toggleNotificationModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModalComponent;

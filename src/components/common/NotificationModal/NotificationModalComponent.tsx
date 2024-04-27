"use client";
import React, { use } from "react";
import { useState, useRef, useEffect } from "react";
import NotificationModal from "@/components/common/NotificationModal/NotificationModal";
import SvgNotificationButton from "./SvgNotificationButton";
import { NOTIFICATION_API_RESPONSE_TYPE } from "./NOTIFICATION_API_RESPONSE_TYPE";
import { alertApiResponse } from "@/util/api";
import { getCookie } from "@/util/cookieSetting";
import { NOTIFICATION_API_ITEM_TYPE } from "./NOTIFICATION_API_RESPONSE_TYPE";
import { set } from "date-fns";

type Props = {};

const NotificationModalComponent = ({}: Props) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleNotificationModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };
  const [status, setStatus] = useState(true);
  const [notificationData, setNotificationData] = useState<
    NOTIFICATION_API_ITEM_TYPE[]
  >([]);

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

  const getNotificationData = async () => {
    console.log("getNotificationData");
    const uid = getCookie("uid");
    const response = await alertApiResponse(uid);
    const contents = response?.items.filter(
      (item: NOTIFICATION_API_ITEM_TYPE) => item.item.read === false,
    );
    console.log(contents);
    if (contents.length > 0) {
      setNotificationData(contents);
      if (notificationData !== contents) {
        setStatus(false);
      }
    } else {
      setNotificationData([]);
      setStatus(true);
    }
  };

  // Setup the event listener when the modal is open and clean it up when it closes
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Only re-run if the modal open state changes

  useEffect(() => {
    getNotificationData();
  }, []);

  return (
    <div className={`relative z-[100] content-end`}>
      <div
        className={`flex justify-end`}
        id="advanced-filter-modal"
        onClick={toggleNotificationModal}
      >
        <SvgNotificationButton status={status} />
        {isNotificationModalOpen && (
          <div
            ref={modalRef}
            className={`absolute top-1 ml-10 mt-10 mob:fixed mob:right-0 mob:top-0 mob:mt-0 mob:h-screen mob:w-full`}
            onClick={(event) => event.stopPropagation()}
          >
            <NotificationModal
              data={notificationData}
              setStatus={setStatus}
              getNotificationData={getNotificationData}
              onClick={toggleNotificationModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModalComponent;

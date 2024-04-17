"use client";
import NotificationModal from '@/components/common/NotificationModal/NotificationModal'
import React, { useState } from 'react'



const NotificationTest = () => {
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const toggleNotificationModal = () => {
        setIsNotificationModalOpen(!isNotificationModalOpen);
    }

  return (
    <div className={`relative`}>
        <button onClick={toggleNotificationModal}>버튼</button>
        {isNotificationModalOpen && (<div className={`fixed top-0 left-0 mt-5`}><NotificationModal /></div>)}
    </div>
  );
}

export default NotificationTest
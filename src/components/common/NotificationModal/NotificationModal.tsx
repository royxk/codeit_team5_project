import React from 'react'
import Data from '@/util/constants/NOTIFICATION_MODAL_MOCK_DATA'
import NotificationModalMessageBox from './NotificationModalMessageBox'

const NotificationModal = () => {
  return (
    <div className={`flex flex-col gap-5 w-96 min-h-96 tab:w-full tab:h-screen tab:border-0 bg-red-10 py-6 px-5 rounded-xl border tab:rounded-none`}>
        <div className={`font-bold text-xl `}>알림 6개</div>
        <div className={`flex flex-col gap-2 overflow-y-auto max-h-96 tab:max-h-full`}>
            {Data.map((data, index) => {
                return <NotificationModalMessageBox state={data.state} message={data.message} time={data.time} key={index}/>
            }
            )}
        </div>
    </div>
  )
}

export default NotificationModal
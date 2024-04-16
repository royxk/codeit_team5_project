import React from 'react';
import S from '../../util/constants/TEST_POST_VALUES';
import Post from '@/components/common/Post';

type Props = {
    imgUrl: string;
    shopName: string;
    address1: string;
    hourlyPay: number;
    startTime: string;
    startHour: string;
  }

const PostTest = () => {
  console.log(S.items);

  return (
    <div className='flex flex-row flex-wrap gap-4'>
      {S.items.map((item, index) => (
        <Post key={index}
        imgUrl={item.item.shop.item.imageUrl}
        shopName={item.item.shop.item.name}
        address1={item.item.shop.item.address1}
        hourlyPay={item.item.hourlyPay}
        startTime={formatDate(item.item.startsAt, item.item.workhour)[0]}
        startHour={formatDate(item.item.startsAt, item.item.workhour)[1]}
        state={!item.item.closed}/>
      ))}
    </div>
  );
}

function formatDate(startsAt: string, workhour: number): string[] {
    const start = new Date(startsAt);
    const end = new Date(start.getTime() + workhour * 3600000);
  
    // Ensuring month and day are two digits
    const formattedMonth = (start.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = start.getDate().toString().padStart(2, '0');
    const formattedStartHours = start.getHours().toString().padStart(2, '0');
    const formattedStartMinutes = start.getMinutes().toString().padStart(2, '0');
    const formattedEndHours = end.getHours().toString().padStart(2, '0');
    const formattedEndMinutes = end.getMinutes().toString().padStart(2, '0');
  
    return [`${start.getFullYear()}-${formattedMonth}-${formattedDay}`, `${formattedStartHours}:${formattedStartMinutes}~${formattedEndHours}:${formattedEndMinutes} (${workhour}시간)`];
  }
export default PostTest;
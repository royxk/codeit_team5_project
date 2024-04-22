import { NoticeResponse } from "@/app/page";
import React from "react";
import Post from "../common/Post/Post";
import { formatApiDateData } from "@/util/formatDate";

type Props = { res: NoticeResponse };

const FilterdNotice = ({ res }: Props) => {
  return (
    <div className="grid w-full grid-cols-3 gap-x-[14px] gap-y-[31px] tab:grid-cols-2 mob:auto-rows-auto mob:gap-2">
      {res?.items.map((item, index) => (
        <Post
          key={index}
          imgUrl={item.item.shop.item.imageUrl}
          shopName={item.item.shop.item.name}
          address1={item.item.shop.item.address1}
          hourlyPay={item.item.hourlyPay}
          startTime={
            formatApiDateData(item.item.startsAt, item.item.workhour)[0]
          }
          startHour={
            formatApiDateData(item.item.startsAt, item.item.workhour)[1]
          }
          state={!item.item.closed}
        />
      ))}
    </div>
  );
};

export default FilterdNotice;

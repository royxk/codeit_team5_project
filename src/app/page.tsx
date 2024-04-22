"use client";
import BasicFilter from "@/components/home/BasicFilter";
import PostTest from "./postTest/page";
import CustomNotice from "@/components/home/CustomNotice";
import Pagination from "@/components/common/Pagination";
import { searchNoticeApiResponse } from "@/util/api";
import { useEffect, useState } from "react";
import Post from "@/components/common/Post/Post";
import S from "@/util/constants/TEST_POST_VALUES";
import { formatApiDateData } from "@/util/formatDate";

export interface NoticeResponse {
  offset: number;
  limit: number;
  address: string[];
  count: number;
  hasNext: boolean;
  items: NoticeItem[];
  links: Link[];
}

interface NoticeItem {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: {
      item: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
      };
      href: string;
    };
  };
  links: Link[];
}

interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
}

export default function Home() {
  const [customNoticeList, setCustomNoticeList] = useState<NoticeResponse>();
  const getCustomNoticeData = async () => {
    const res = await searchNoticeApiResponse();
    console.log(res);
    setCustomNoticeList(res);
  };
  useEffect(() => {
    getCustomNoticeData();
  }, []);
  return (
    <>
      <section className="flex justify-center bg-red-10 py-[60px]">
        <div className="flex max-w-[964px] flex-col items-center">
          <h1 className="w-full pb-[31px] text-left text-[28px] font-bold tracking-[0.56px]">
            맞춤공고
          </h1>
          {customNoticeList && <CustomNotice res={customNoticeList} />}
        </div>
      </section>
      <section className="flex justify-center py-[60px]">
        <div className="flex max-w-[964px] flex-col items-center">
          <div className="flex w-full justify-between pb-[31px] text-left text-[28px] font-bold tracking-[0.56px]">
            <h1>전체공고</h1>
            <div className="flex items-center gap-[10px]">
              <BasicFilter />
              <div>상세 필터</div>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 gap-x-[14px] gap-y-[31px] tab:grid-cols-2 mob:auto-rows-auto mob:gap-2">
            {S.items.map((item, index) => (
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

          {customNoticeList && (
            <Pagination
              rawPageData={customNoticeList.items}
              setCurrentPageData={}
            />
          )}
        </div>
      </section>
    </>
  );
}

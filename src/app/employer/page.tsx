import React from "react";
import StoreDetail from "@/components/common/StoreDetail";
import {
  mydataApiResponse,
  searchShopInformationApiResponse,
  searchShopNoticeApiResponse,
} from "@/util/api";
import { redirect } from "next/navigation";
import { getServerSideCookie } from "../utils/serverCookies";
import PostEmployer from "@/components/employer/PostEmployer";

const getServerSideProps = async () => {
  const uid = getServerSideCookie("uid");

  if (uid !== undefined) {
    const { item } = await mydataApiResponse(uid);
    const sid = getServerSideCookie("sid");

    if (!sid === undefined && item.type === "employer" && item.shop) {
      const { id: shopId } = item.shop.item;
      const shopData = await searchShopInformationApiResponse(shopId);
      const noticeList = await searchShopNoticeApiResponse(shopId, {
        limit: 6,
      });
      return { uid, shopData, noticeList };
    }

    if (sid) {
      const shopData = await searchShopInformationApiResponse(sid);
      const noticeList = await searchShopNoticeApiResponse(sid);
      return { uid, shopData, noticeList };
    }
  }

  return { uid };
};

const Employer = async () => {
  const { uid, shopData, noticeList } = await getServerSideProps();
  if (uid === undefined) {
    redirect("/signin");
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-10.625rem)] max-w-[64.25rem] px-8 py-[3.75rem]">
      <StoreDetail data={shopData} />
      <PostEmployer shopData={shopData} noticeList={noticeList} />
    </div>
  );
};

export default Employer;

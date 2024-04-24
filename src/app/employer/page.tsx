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

    if (item.type === "employee") {
      return { uid, item };
    }

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
  const { uid, item, shopData, noticeList } = await getServerSideProps();
  if (uid === undefined) {
    redirect("/signin");
  }

  if (item.type === "employee") {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-10.625rem)] flex-col">
      <div className="mx-auto flex w-full max-w-[64.25rem] flex-col px-8 py-[3.75rem] tab:mx-0">
        <StoreDetail data={shopData} />
      </div>
      {shopData && (
        <div className="mx-auto flex w-full justify-center bg-gray-5 px-8 py-[3.75rem]">
          <PostEmployer shopData={shopData} noticeList={noticeList} />
        </div>
      )}
    </div>
  );
};

export default Employer;

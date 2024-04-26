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

    if (item.type === "employee") {
      const type = "employee";
      return { uid, type };
    }
    const sid = getServerSideCookie("sid") || item.shop.item.id;

    if (sid) {
      const shopData = await searchShopInformationApiResponse(sid);
      const noticeList = await searchShopNoticeApiResponse(sid, {
        limit: 6,
      });
      const type = "employer";
      return { uid, type, shopData, noticeList };
    }

    if (!sid) {
      const shopData = null;
      const type = "employer";
      return { uid, type, shopData };
    }
  }

  return { uid };
};

const Employer = async () => {
  const { uid, type, shopData, noticeList } = await getServerSideProps();

  if (uid === undefined) {
    redirect("/signin");
  }

  if (type === "employee") {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-10.625rem)] flex-col">
      <div className="mx-auto flex w-full max-w-[64.25rem] flex-col px-8 py-[3.75rem] tab:mx-0">
        <StoreDetail data={shopData} />
      </div>
      {shopData && (
        <div className="mx-auto flex w-full justify-center bg-gray-5 px-8 py-[3.75rem] tab:mx-0">
          <div className="w-full max-w-[60.25rem] tab:flex tab:justify-center">
            <PostEmployer shopData={shopData} fetchedNoticeList={noticeList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Employer;

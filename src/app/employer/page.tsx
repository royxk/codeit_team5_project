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

  if (uid === undefined) {
    redirect("/signin");
  }

  if (uid !== undefined) {
    const sid = getServerSideCookie("sid");

    if (sid === undefined) {
      redirect("/");
    }

    if (sid) {
      const shopData = await searchShopInformationApiResponse(sid);
      const noticeList = await searchShopNoticeApiResponse(sid, {
        limit: 6,
      });

      return { shopData, noticeList };
    }

    if (sid === "") {
      const shopData = null;

      return { shopData };
    }
  }
  return {};
};

const Employer = async () => {
  const { shopData, noticeList } = await getServerSideProps();

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

import React from "react";
import {
  searchShopInformationApiResponse,
  searchShopNoticeApiResponse,
} from "@/util/api";
import { redirect } from "next/navigation";
import { getServerSideCookie } from "../../utils/serverCookies";
import PostEmployer from "@/components/employer/PostEmployer";
import EmployerStoreDetail from "@/components/employer/EmployerStoreDetail";

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
        <EmployerStoreDetail data={shopData} />
      </div>

      <PostEmployer rawShopData={shopData} fetchedNoticeList={noticeList} />
    </div>
  );
};

export default Employer;

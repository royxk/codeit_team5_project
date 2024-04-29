import React from "react";
import {
  searchShopInformationApiResponse,
  searchShopNoticeApiResponse,
} from "@/util/api";
import { getServerSideCookie } from "../../utils/serverCookies";
import PostEmployer from "@/components/employer/PostEmployer";
import EmployerStoreDetail from "@/components/employer/EmployerStoreDetail";

const getServerSideProps = async () => {
  const sid = getServerSideCookie("sid");

  if (sid) {
    const noticeList = await searchShopNoticeApiResponse(sid, {
      limit: 6,
    });

    return { noticeList };
  }

  if (sid === "") {
    return {};
  }

  return {};
};

const Employer = async () => {
  const { noticeList } = await getServerSideProps();

  return (
    <div className="flex min-h-[calc(100vh-10.625rem)] flex-col">
      <div className="mx-auto flex w-full max-w-[64.25rem] flex-col px-8 py-[3.75rem] tab:mx-0">
        <EmployerStoreDetail />
      </div>

      <PostEmployer fetchedNoticeList={noticeList} />
    </div>
  );
};

export default Employer;

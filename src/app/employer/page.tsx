import React, { useEffect, useState } from "react";
import StoreDetail from "@/components/common/StoreDetail";
import {
  mydataApiResponse,
  searchShopInformationApiResponse,
} from "@/util/api";
import { getCookie, setShopIdCookie } from "@/util/cookieSetting";
import { redirect, useRouter } from "next/navigation";
import StoreDetailProps from "@/components/common/StoreDetail/StoreDetailTypes";
import { getServerSideCookie } from "../utils/serverCookies";

const getServerSideProps = async () => {
  const uid = getServerSideCookie("uid");

  if (uid !== undefined) {
    const { item } = await mydataApiResponse(uid);
    const sid = getServerSideCookie("sid");

    if (!sid === undefined && item.type === "employer" && item.shop) {
      const { id: shopId } = item.shop.item;
      const shopData = await searchShopInformationApiResponse(shopId);
      return { uid, shopData };
    }

    if (sid) {
      const shopData = await searchShopInformationApiResponse(sid);
      return { uid, shopData };
    }
  }

  return { uid };
};

const Employer = async () => {
  const { uid, shopData } = await getServerSideProps();
  if (uid === undefined) {
    redirect("/signin");
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-10.625rem)] max-w-[64.25rem] px-8 py-[3.75rem]">
      <StoreDetail data={shopData} />
    </div>
  );
};

export default Employer;

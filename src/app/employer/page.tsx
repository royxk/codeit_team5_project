"use client";
import React, { useEffect, useState } from "react";
import StoreDetail from "@/components/common/StoreDetail";
import {
  mydataApiResponse,
  searchShopInformationApiResponse,
} from "@/util/api";
import { getCookie, setShopIdCookie } from "@/util/cookieSetting";
import { useRouter } from "next/navigation";

const Employer = () => {
  const [storeData, setStoreData] = useState({ data: { item: undefined } });
  const router = useRouter();

  async function userStoreLoad(uid: string) {
    const { item } = await mydataApiResponse(uid);
    const sid = getCookie("sid");

    if (!sid && item.type === "employer" && item.shop) {
      const { id: shopId } = item.shop.item;
      setShopIdCookie(shopId);
      const shopData = await searchShopInformationApiResponse(shopId);
      setStoreData(shopData);
      return;
    }

    if (sid) {
      const shopData = await searchShopInformationApiResponse(sid);
      setStoreData(shopData);
    }
  }

  useEffect(() => {
    const uid = getCookie("uid");
    if (uid !== undefined) {
      userStoreLoad(uid);
    } else {
      router.push("/signin");
    }
  }, []);

  return (
    <div className="mx-auto min-h-[calc(100vh-10.625rem)] max-w-[64.25rem] px-8 py-[3.75rem]">
      <StoreDetail data={storeData} />
    </div>
  );
};

export default Employer;

import { getServerSideCookie } from "@/app/utils/serverCookies";
import StoreEditForm from "@/components/employer/StoreEditForm";
import {
  mydataApiResponse,
  searchShopInformationApiResponse,
  searchShopNoticeApiResponse,
} from "@/util/api";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const getServerSideProps = async () => {
  const uid = getServerSideCookie("uid");

  if (uid !== undefined) {
    const { item } = await mydataApiResponse(uid);
    const sid = getServerSideCookie("sid") || item.shop.item.id;

    if (item.type === "employee") {
      const type = "employee";
      return { uid, type };
    }

    if (sid) {
      const shopData = await searchShopInformationApiResponse(sid);
      const type = "employer";
      return { uid, type, shopData };
    }

    if (!sid) {
      const shopData = null;
      const type = "employer";
      return { uid, type, shopData };
    }
  }

  return { uid };
};

const EmployerRegisterStore = async () => {
  const { uid, type, shopData } = await getServerSideProps();

  if (uid === undefined) {
    redirect("/signin");
  }

  if (type === "employee") {
    redirect("/");
  }

  return (
    <div className="h-full w-full bg-gray-5">
      <main className="m-auto min-h-[calc(100vh-10.625rem)] max-w-[64.3125rem] px-8 py-[3.75rem]">
        <div className="h1 mob:h3 mb-8 flex items-center justify-between">
          가게 정보{" "}
          <Link href={"/employer"} className="relative h-8 w-8">
            <Image fill src={"/icons/close.svg"} alt="cancel-register-store" />
          </Link>
        </div>
        <StoreEditForm data={shopData} />
      </main>
    </div>
  );
};

export default EmployerRegisterStore;

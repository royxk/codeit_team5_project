"use client";
import React from "react";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";

const StoreDetailButtons = () => {
  const pathName = usePathname();
  const router = useRouter();
  const isEmployerMainPage = pathName.includes("employer");

  return (
    <>
      {isEmployerMainPage ? (
        <div className="flex gap-2">
          <Button
            size="full"
            color="white"
            onClick={() => router.push("employer/edit")}
          >
            편집하기
          </Button>
          <Button
            size="full"
            color="red"
            onClick={() => router.push("/employer/post")}
          >
            공고 등록하기
          </Button>
        </div>
      ) : (
        <Button size="full" color="red">
          공고 편집하기
        </Button>
      )}
    </>
  );
};

export default StoreDetailButtons;

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathName = usePathname();
  const isFooterHidden = pathName.includes("sign");
  if (isFooterHidden) return;

  return (
    <footer className="mx-0 flex w-full justify-center bg-gray-10 px-8 py-[37px] mob:pb-4">
      <div className="flex w-full max-w-[964px] flex-row items-start justify-between gap-y-10 mob:grid mob:grid-cols-2 ">
        <a className="body1 col-span-2 row-start-2 cursor-default text-gray-50">
          ©codeit - 2023
        </a>

        <div className="flex gap-[10px]">
          <Link href={""} className="body1 text-gray-50 mob:w-min">
            Privacy Policy
          </Link>
          <Link href={""} className="body1 text-gray-50">
            FAQ
          </Link>
        </div>
        <div className="flex justify-end gap-[10px]">
          <Link href={""}>
            <Image src={"/footer/gmail.svg"} width={25} height={25} alt={""} />
          </Link>
          <Link href={""}>
            <Image
              src={"/footer/facebook.svg"}
              width={25}
              height={25}
              alt={""}
            />
          </Link>
          <Link href={""}>
            <Image
              src={"/footer/instagram.svg"}
              width={25}
              height={25}
              alt={""}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const FOOTER_ICON_REF = [
  {
    source: "/footer/gmail.svg",
    link: "https://mail.google.com/",
    alt: "gmail",
  },
  {
    source: "/footer/facebook.svg",
    link: "https://www.facebook.com/",
    alt: "facebook",
  },
  {
    source: "/footer/instagram.svg",
    link: "https://www.instagram.com/",
    alt: "instagram",
  },
];

const Footer = () => {
  return (
    <footer className="mx-0 flex w-full justify-center bg-gray-10 px-8 py-[37px] tab:-mx-8 tab:w-screen tab:px-8 mob:-mx-4 mob:w-screen mob:px-5 mob:pb-4">
      <div className="flex w-full max-w-[964px] flex-row items-start justify-between gap-y-10 mob:grid mob:grid-cols-2 ">
        <a className="body1 col-span-2 row-start-2 cursor-default text-gray-50">
          ©얹어드림 - 2024
        </a>

        <div className="flex">
          <Link
            href={""}
            className="body1 whitespace-nowrap pr-[30px] text-gray-50"
          >
            Privacy Policy
          </Link>
          <Link href={""} className="body1 text-gray-50">
            FAQ
          </Link>
        </div>

        <div className="flex justify-end gap-[10px]">
          {FOOTER_ICON_REF.map((item) => (
            <Link
              key={item.alt}
              href={item.link}
              target="_blank"
              className="relative h-[25px] w-[25px]"
            >
              <Image src={item.source} fill alt={item.alt} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NotificationModalComponent from "./NotificationModal/NotificationModalComponent";
import { MockData } from "./NotificationModal/NOTIFICATION_API_RESPONSE_TYPE";
import SearchSvg from "./GNB/SearchSvg";
import LogoSvg from "./GNB/LogoSvg";
import { getCookie } from "@/util/cookieSetting";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/util/api";

const GNB = () => {
  const pathname = usePathname();
  const isSign = pathname.includes("sign");
  const [isLogin, setIsLogin] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const pathName = usePathname();

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchRef.current) {
        const value = searchRef.current.value;
        searchRef.current.value = "";
        router.push(`/search?keyword=${value}`);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (getCookie("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    if (getCookie("sid")) {
      setIsEmployer(true);
    } else {
      setIsEmployer(false);
    }
    setIsLoading(false);
  }, [pathName]);

  if (isSign) return;

  const handleLogout = () => {
    logout();
    setIsLogin(false);
    setIsEmployer(false);
  };

  return (
    <div className="flex h-[70px] w-full items-center justify-center mob:h-[102px] mob:px-3">
      <div className="flex w-full max-w-[1080px] flex-col items-center justify-center px-8 tab:px-0">
        <div className="flex w-full items-center justify-between bg-white mob:items-start">
          <div className="flex gap-10 mob:w-full mob:flex-col mob:gap-2">
            <Link
              href="/"
              className="flex h-10 items-center justify-center mob:justify-start"
            >
              <LogoSvg />
            </Link>
            <div>
              <div className="relative w-[450px] tab:w-[300px] mob:w-full">
                <div className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform mob:left-2 mob:top-[22px]">
                  <SearchSvg />
                </div>
                <input
                  onKeyDown={handleSearchKeyDown}
                  ref={searchRef}
                  className="h-10 w-full rounded-[10px] bg-gray-10 pl-12 text-lg focus:outline-none mob:pl-7 mob:text-sm"
                  type="text"
                  placeholder="가게 이름으로 찾아보세요"
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <></>
          ) : (
            <>
              {isLogin ? (
                <div
                  className="flex gap-10 mob:absolute mob:right-5 mob:top-4 mob:gap-4 mob:text-sm"
                  suppressHydrationWarning
                >
                  {isEmployer ? (
                    <Link href={"/employer"}>
                      <button
                        className="flex h-5 font-bold text-black"
                        suppressHydrationWarning
                      >
                        내 가게
                      </button>
                    </Link>
                  ) : (
                    <Link href={"/employee"}>
                      <button
                        className="flex h-5 font-bold text-black"
                        suppressHydrationWarning
                      >
                        내 프로필
                      </button>
                    </Link>
                  )}
                  <Link href={"/signin"}>
                    <button
                      className="flex h-5 font-bold text-black"
                      onClick={handleLogout}
                      suppressHydrationWarning
                    >
                      로그아웃
                    </button>
                  </Link>
                  <NotificationModalComponent data={MockData} />
                </div>
              ) : (
                <div
                  className="flex gap-10 mob:absolute mob:right-5 mob:top-4 mob:gap-4 mob:text-sm"
                  suppressHydrationWarning
                >
                  <Link href={"/signin"}>
                    <button
                      className="flex h-5 font-bold text-black"
                      suppressHydrationWarning
                    >
                      로그인
                    </button>
                  </Link>
                  <Link href={"/signup"}>
                    <button
                      className="flex h-5 font-bold text-black"
                      suppressHydrationWarning
                    >
                      회원 가입
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GNB;

import React from "react";
import Employer from "./Employer";
import Post from "./Post";
import Image from "next/image";

interface StoreDetailProps {
  isEmployerMainPage?: boolean;
}

const StoreDetail = ({
  isEmployerMainPage = false,
  isUserEmployer = false,
}) => {
  return (
    <main
      className={`flex h-[22.25rem] w-full max-w-[60.25rem] flex-row gap-x-8 overflow-hidden rounded-xl border-[1px] border-gray-20 p-6
                  tab:h-auto tab:flex-col mob:p-5
      ${isEmployerMainPage ? "bg-red-10" : "bg-white"}`}
    >
      <div className="relative h-full w-full  overflow-hidden rounded-xl tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
        <Image
          src={`/store-detail-sample/unsplash.png`}
          className="object-cover"
          fill
          alt=""
        />
      </div>
      <section
        className="flex min-w-[21.625rem] flex-col justify-between pt-4 
                  tab:min-w-0 tab:gap-10 mob:gap-6 mob:pt-3"
      >
        {isEmployerMainPage ? <Employer /> : <Post />}
      </section>
    </main>
  );
};

export default StoreDetail;

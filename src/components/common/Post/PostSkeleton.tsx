import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex h-[348px] w-[312px] flex-shrink-0 animate-pulse snap-center flex-col content-center gap-4 rounded-xl border bg-white p-[16px] mob:h-[260px] mob:w-[171px] mob:gap-2 mob:p-3">
      <div className="relative h-[160px] rounded-xl  bg-gray-300 mob:h-[84px]"></div>{" "}
      <div className="flex h-auto flex-col gap-4 mob:gap-1">
        <div className="flex flex-col gap-3">
          <div className="h-6 w-3/4 rounded bg-gray-300 mob:w-full"></div>

          <div className="flex w-full flex-row items-center gap-4 mob:gap-4">
            <div className="h-4 w-4 rounded-full bg-gray-300"></div>{" "}
            <div className="flex flex-row gap-4 mob:flex-col mob:gap-1">
              <div className="h-4 w-20 rounded bg-gray-300 mob:w-20"></div>
              <div className="h-4 w-20 rounded bg-gray-300 mob:w-full"></div>{" "}
            </div>
          </div>

          <div className="flex flex-row gap-4 mob:gap-4">
            <div className="h-4 w-4 rounded-full bg-gray-300"></div>{" "}
            <div className="h-4 w-1/2 rounded bg-gray-300 mob:w-20"></div>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-4 mob:flex-col mob:items-start mob:gap-1">
          <div className="h-[30px] w-[110px] rounded bg-gray-300 mob:h-[15px] mob:w-full"></div>
          <div className="flex h-[40px] w-[150px] items-center rounded-3xl bg-gray-300 mob:h-[15px] mob:w-full mob:rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;

import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex w-[312px] flex-shrink-0 animate-pulse snap-center flex-col content-center gap-4 rounded-xl border bg-white p-[16px] mob:h-[260px] mob:w-48 mob:gap-2 mob:p-3">
      <div className="relative h-[160px] rounded-xl bg-gray-300"></div>{" "}
      <div className="flex h-auto flex-col gap-4 mob:gap-1">
        <div className="flex flex-col gap-2 mob:gap-1">
          <div className="h-6 w-3/4 rounded bg-gray-300 mob:w-full"></div>

          <div className="flex flex-row items-center gap-4 mob:gap-3">
            <div className="h-4 w-4 rounded-full bg-gray-300"></div>{" "}
            <div className="flex flex-row gap-4 mob:flex-col mob:gap-1">
              <div className="h-4 w-20 rounded bg-gray-300 mob:w-full"></div>
              <div className="h-4 w-20 rounded bg-gray-300 mob:w-full"></div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="h-4 w-4 rounded-full bg-gray-300"></div>{" "}
            <div className="h-4 w-1/2 rounded bg-gray-300 mob:w-full"></div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-2 mob:flex-col mob:items-start mob:gap-1">
          <div className="h-6 w-1/3 rounded bg-gray-300 mob:w-full"></div>
          <div className="flex h-6 w-1/2 items-center rounded bg-gray-300 mob:w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;

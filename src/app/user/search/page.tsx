"use client";
import NoticeMain from "@/components/home/NoticeMain";
import { useSearchParams } from "next/navigation";
import { usePageMetadata } from "@/hooks/usePageMetadata";

import { Suspense } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const titleWithKeyword = "얹어드림 - " + keyword + " | 검색 결과";

  const { SetMetadata } = usePageMetadata();
  SetMetadata({ title: titleWithKeyword as string });

  return <NoticeMain keyword={keyword} />;
};

const SearchPageCover = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};
export default SearchPageCover;

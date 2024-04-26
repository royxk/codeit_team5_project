"use client";
import NoticeMain from "@/components/home/NoticeMain";
import { useSearchParams } from "next/navigation";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const titleWithKeyword = keyword + " | 검색 결과";

  const { SetMetadata } = usePageMetadata();
  SetMetadata({ title: titleWithKeyword as string });

  return <NoticeMain keyword={keyword} />;
};

export default SearchPage;

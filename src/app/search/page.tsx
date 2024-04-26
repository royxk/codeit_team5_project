"use client";
import NoticeMain from "@/components/home/NoticeMain";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  return <NoticeMain keyword={keyword} />;
};

export default SearchPage;

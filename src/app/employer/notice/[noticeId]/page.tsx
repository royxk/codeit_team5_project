import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Button from "@/components/common/Button";

const EmployerNoticeDetailPage = () => {
  const headersList = headers();
  const referer = headersList.get("referer")!;

  const noticeId = referer.split("notice/")[1];
  return <div className="min-h-[calc(100vh-170px)] bg-gray-5"></div>;
};

export default EmployerNoticeDetailPage;

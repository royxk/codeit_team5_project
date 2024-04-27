import { usePathname } from "next/navigation";

const useNoticeId = () => {
  const currentUrl = usePathname();
  const isEditPage = currentUrl.includes("notice/");
  const noticeId = isEditPage
    ? currentUrl.split("notice/")[1].split("/edit")[0]
    : null;

  return noticeId;
};

export default useNoticeId;

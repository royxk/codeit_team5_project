import { useParams } from "next/navigation";

const useNoticeId = () => {
  const currentUrl = useParams<{ noticeId: string }>();

  return currentUrl.noticeId;
};

export default useNoticeId;

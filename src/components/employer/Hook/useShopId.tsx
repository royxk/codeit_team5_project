import { getCookie } from "@/util/cookieSetting";
import { useParams } from "next/navigation";

const useShopId = () => {
  const currentUrl = useParams<{ shopId: string }>();

  return currentUrl?.shopId || getCookie("sid");
};

export default useShopId;

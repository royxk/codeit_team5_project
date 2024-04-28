import { useParams } from "next/navigation";

const useShopId = () => {
  const currentUrl = useParams<{ shopId: string }>();

  return currentUrl.shopId;
};

export default useShopId;

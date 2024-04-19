interface ShopDataType {
  item: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
    user?: {
      item: {
        id: string;
        email: string;
        type: string;
      };
      href: string;
    };
  };
}

interface StoreDetailPostType {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: ShopDataType;
    currentUserApplication: null;
  };
}
export default interface StoreDetailProps {
  data: StoreDetailPostType | ShopDataType;
}

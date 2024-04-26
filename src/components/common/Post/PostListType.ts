// interface ShopItem {
//   id: string;
//   name: string;
//   category: string;
//   address1: string;
//   address2: string;
//   description: string;
//   imageUrl: string;
//   originalHourlyPay: number;
// }

// // Define the type for the shop
// interface Shop {
//   item: ShopItem;
//   href: string;
// }

// // Define the type for links related to the item
// interface Link {
//   rel: string;
//   description: string;
//   method: "GET" | "POST" | "PUT" | "DELETE"; // This can be extended based on the actual methods used
//   href: string;
// }

// // Define the type for the main item structure
// interface Item {
//   id: string;
//   hourlyPay: number;
//   startsAt: string;
//   workhour: number;
//   description: string;
//   closed: boolean;
//   shop: Shop;
//   href: string;
// }
// // Define the response structure for the API
// type ApiResponse = {
//   item: Item;
//   links: Link[];
// };

export interface NoticeResponse {
  offset: number;
  limit: number;
  address: string[];
  count: number;
  hasNext: boolean;
  items: NoticeItem[];
  links: Link[];
}

export interface NoticeItem {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: {
      item: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
      };
      href: string;
    };
  };
  links: Link[];
}

interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
}
export default NoticeResponse;

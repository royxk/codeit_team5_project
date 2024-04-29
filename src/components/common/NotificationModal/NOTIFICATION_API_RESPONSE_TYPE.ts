//TODO: 메인페이지 로딩했을 시에 useEffect로 공고  apiResponse를 가져옴
//TODO: apiResponse가 있을시에 있는 상태표시하기
//TODO: notification Button 눌렀을 시에

export interface NOTIFICATION_API_RESPONSE_TYPE {
  offset: number;
  limit: number;
  count: number; // 전체 개수
  hasNext: boolean; // 다음 내용 존재 여부
  items: NOTIFICATION_API_ITEM_TYPE[];
}

export interface NOTIFICATION_API_ITEM_TYPE {
  item: {
    id: string;
    createdAt: string;
    result: "accepted" | "rejected" | "canceled";
    read: boolean;
    application: {
      item: {
        id: string;
        status: "pending" | "accepted" | "rejected";
      };
      href: string;
    };
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
    notice: {
      item: {
        id: string;
        hourlyPay: number;
        description: string;
        startsAt: string;
        workhour: number;
        closed: boolean;
      };
      href: string;
    };
    links: [];
  };
}

export const MockData: NOTIFICATION_API_RESPONSE_TYPE = {
  offset: 0,
  limit: 10,
  count: 20,
  hasNext: true,
  items: [
    {
      item: {
        id: "notif-001",
        createdAt: "2024-04-25T12:00:00Z",
        result: "accepted",
        read: true,
        application: {
          item: {
            id: "app-001",
            status: "pending",
          },
          href: "/applications/001",
        },
        shop: {
          item: {
            id: "shop-001",
            name: "Bakery Delights",
            category: "Food Services",
            address1: "123 Main St",
            address2: "Unit 5",
            description: "A local bakery offering fresh pastries and breads.",
            imageUrl: "https://example.com/images/shop-001.jpg",
            originalHourlyPay: 15.0,
          },
          href: "/shops/001",
        },
        notice: {
          item: {
            id: "notice-001",
            hourlyPay: 16.5,
            description: "Need an extra baker for the upcoming holiday season.",
            startsAt: "2024-11-01T08:00:00Z",
            workhour: 8,
            closed: false,
          },
          href: "/notices/001",
        },
        links: [],
      },
    },
    {
      item: {
        id: "notif-002",
        createdAt: "2024-04-24T15:30:00Z",
        result: "rejected",
        read: false,
        application: {
          item: {
            id: "app-002",
            status: "rejected",
          },
          href: "/applications/002",
        },
        shop: {
          item: {
            id: "shop-002",
            name: "Gadget World",
            category: "Retail",
            address1: "456 Side Ave",
            address2: "Suite 22",
            description:
              "Retail store specializing in the latest electronic gadgets.",
            imageUrl: "https://example.com/images/shop-002.jpg",
            originalHourlyPay: 18.0,
          },
          href: "/shops/002",
        },
        notice: {
          item: {
            id: "notice-002",
            hourlyPay: 19.0,
            description:
              "Looking for a salesperson with expertise in tech gadgets for the holiday rush.",
            startsAt: "2024-10-15T09:00:00Z",
            workhour: 6,
            closed: true,
          },
          href: "/notices/002",
        },
        links: [],
      },
    },
    {
      item: {
        id: "notif-001",
        createdAt: "2024-04-25T12:00:00Z",
        result: "accepted",
        read: true,
        application: {
          item: {
            id: "app-001",
            status: "pending",
          },
          href: "/applications/001",
        },
        shop: {
          item: {
            id: "shop-001",
            name: "Bakery Delights",
            category: "Food Services",
            address1: "123 Main St",
            address2: "Unit 5",
            description: "A local bakery offering fresh pastries and breads.",
            imageUrl: "https://example.com/images/shop-001.jpg",
            originalHourlyPay: 15.0,
          },
          href: "/shops/001",
        },
        notice: {
          item: {
            id: "notice-001",
            hourlyPay: 16.5,
            description: "Need an extra baker for the upcoming holiday season.",
            startsAt: "2024-11-01T08:00:00Z",
            workhour: 8,
            closed: false,
          },
          href: "/notices/001",
        },
        links: [],
      },
    },
    {
      item: {
        id: "notif-001",
        createdAt: "2024-04-25T12:00:00Z",
        result: "accepted",
        read: true,
        application: {
          item: {
            id: "app-001",
            status: "pending",
          },
          href: "/applications/001",
        },
        shop: {
          item: {
            id: "shop-001",
            name: "Bakery Delights",
            category: "Food Services",
            address1: "123 Main St",
            address2: "Unit 5",
            description: "A local bakery offering fresh pastries and breads.",
            imageUrl: "https://example.com/images/shop-001.jpg",
            originalHourlyPay: 15.0,
          },
          href: "/shops/001",
        },
        notice: {
          item: {
            id: "notice-001",
            hourlyPay: 16.5,
            description: "Need an extra baker for the upcoming holiday season.",
            startsAt: "2024-11-01T08:00:00Z",
            workhour: 8,
            closed: false,
          },
          href: "/notices/001",
        },
        links: [],
      },
    },
    {
      item: {
        id: "notif-001",
        createdAt: "2024-04-25T12:00:00Z",
        result: "accepted",
        read: true,
        application: {
          item: {
            id: "app-001",
            status: "pending",
          },
          href: "/applications/001",
        },
        shop: {
          item: {
            id: "shop-001",
            name: "Bakery Delights",
            category: "Food Services",
            address1: "123 Main St",
            address2: "Unit 5",
            description: "A local bakery offering fresh pastries and breads.",
            imageUrl: "https://example.com/images/shop-001.jpg",
            originalHourlyPay: 15.0,
          },
          href: "/shops/001",
        },
        notice: {
          item: {
            id: "notice-001",
            hourlyPay: 16.5,
            description: "Need an extra baker for the upcoming holiday season.",
            startsAt: "2024-11-01T08:00:00Z",
            workhour: 8,
            closed: false,
          },
          href: "/notices/001",
        },
        links: [],
      },
    },
  ],
};

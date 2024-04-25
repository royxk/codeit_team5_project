import StoreDetailProps from "@/components/common/StoreDetail/StoreDetailTypes";

export const STORE_DETAIL_POST = {
  item: {
    id: "5a31787f-d878-4409-b9c7-62daefa21e69",
    hourlyPay: 60000,
    startsAt: "2024-05-01T00:00:00.000Z",
    workhour: 3,
    description: "더 오른 급여여",
    closed: true,
    shop: {
      item: {
        id: "da8c6ed3-c73e-4057-a039-804e8eb71d7a",
        name: "음머어 소갈비 2호점",
        category: "한식",
        address1: "서울시 ",
        address2: "소갈비길",
        description: "싸고 맛있는집이라네",
        imageUrl:
          "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/ce383d5a-c9f3-43ff-84ce-4844dcbeb1e2-aj-McsNra2VRQQ-unsplash.jpg",
        originalHourlyPay: 50000,
      },
      href: "/api/4-5/the-julge/shops/da8c6ed3-c73e-4057-a039-804e8eb71d7a",
    },
    currentUserApplication: null,
  },
  links: [
    {
      rel: "self",
      description: "공고 정보",
      method: "GET",
      href: "/api/4-5/the-julge/shops/da8c6ed3-c73e-4057-a039-804e8eb71d7a/notices/5a31787f-d878-4409-b9c7-62daefa21e69",
    },
    {
      rel: "update",
      description: "공고 수정",
      method: "PUT",
      href: "/api/4-5/the-julge/shops/da8c6ed3-c73e-4057-a039-804e8eb71d7a/notices/5a31787f-d878-4409-b9c7-62daefa21e69",
      body: {
        hourlyPay: "number",
        startsAt: "string",
        workhour: "string",
        description: "string",
      },
    },
    {
      rel: "applications",
      description: "지원 목록",
      method: "GET",
      href: "/api/4-5/the-julge/shops/da8c6ed3-c73e-4057-a039-804e8eb71d7a/notices/5a31787f-d878-4409-b9c7-62daefa21e69/applications",
      query: {
        offset: "undefined | number",
        limit: "undefined | number",
      },
    },
    {
      rel: "create",
      description: "지원하기",
      method: "POST",
      href: "/api/4-5/the-julge/shops/da8c6ed3-c73e-4057-a039-804e8eb71d7a/notices/5a31787f-d878-4409-b9c7-62daefa21e69/applications",
    },
    {
      rel: "shop",
      description: "가게 정보",
      method: "GET",
      href: "/api/4-5/the-julge/shops/da8c6ed3-c73e-4057-a039-804e8eb71d7a",
    },
    {
      rel: "list",
      description: "공고 목록",
      method: "GET",
      href: "/api/4-5/the-julge/shops/da8c6ed3-c73e-4057-a039-804e8eb71d7a/notices",
      query: {
        offset: "undefined | number",
        limit: "undefined | number",
      },
    },
  ],
};

export const initialStoreDetailPost: StoreDetailProps = {
  item: {
    id: "",
    hourlyPay: 0,
    startsAt: "2024-05-01T00:00:00.000Z",
    workhour: 0,
    description: "",
    closed: false,
    shop: {
      item: {
        id: "",
        name: "",
        category: "",
        address1: "",
        address2: "",
        description: "",
        imageUrl: "",
        originalHourlyPay: 0,
        user: undefined,
      },
    },
    currentUserApplication: null,
  },
};

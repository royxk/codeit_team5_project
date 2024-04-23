export const STORE_DETAIL_ASSIGNED = {
  offset: 0,
  limit: 10,
  count: 2,
  hasNext: false,
  items: [
    {
      item: {
        id: "48874724-ecc7-4e57-bdb8-d5aa8dcc9028",
        status: "accepted",
        createdAt: "2024-04-15T07:21:57.898Z",
        user: {
          item: {
            id: "52dac023-f435-4655-9b3c-8751afc65a71",
            email: "white@naver.com",
            type: "employer",
          },
          href: "/api/0-1/the-julge/users/52dac023-f435-4655-9b3c-8751afc65a71",
        },
        shop: {
          item: {
            id: "52200d57-25a3-4910-9903-e524d1d67a57",
            name: "음머어 소갈비",
            category: "한식",
            address1: "서울시 종로구",
            address2: "소갈비길",
            description: "싸고 맛있는집",
            imageUrl:
              "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/ce383d5a-c9f3-43ff-84ce-4844dcbeb1e2-aj-McsNra2VRQQ-unsplash.jpg",
            originalHourlyPay: 50000,
          },
          href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57",
        },
        notice: {
          item: {
            id: "ba1e7554-0b2b-4583-9a6f-a16dae71b46a",
            hourlyPay: 500000,
            description: "string",
            startsAt: "2024-05-01T00:00:00.000Z",
            workhour: 5,
            closed: true,
          },
          href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a",
        },
      },
      links: [
        {
          rel: "update",
          description: "지원 승인/거절",
          method: "PUT",
          href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a/applications/48874724-ecc7-4e57-bdb8-d5aa8dcc9028",
          body: {
            status: "accepted | rejected",
          },
        },
      ],
    },
    {
      item: {
        id: "a0ef59df-f27b-4659-a2ac-7c668374df69",
        status: "pending",
        createdAt: "2024-04-15T07:18:02.283Z",
        user: {
          item: {
            id: "52dac023-f435-4655-9b3c-8751afc65a71",
            email: "white@naver.com",
            type: "employer",
          },
          href: "/api/0-1/the-julge/users/52dac023-f435-4655-9b3c-8751afc65a71",
        },
        shop: {
          item: {
            id: "52200d57-25a3-4910-9903-e524d1d67a57",
            name: "음머어 소갈비",
            category: "한식",
            address1: "서울시 종로구",
            address2: "소갈비길",
            description: "싸고 맛있는집",
            imageUrl:
              "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/ce383d5a-c9f3-43ff-84ce-4844dcbeb1e2-aj-McsNra2VRQQ-unsplash.jpg",
            originalHourlyPay: 50000,
          },
          href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57",
        },
        notice: {
          item: {
            id: "ba1e7554-0b2b-4583-9a6f-a16dae71b46a",
            hourlyPay: 500000,
            description: "string",
            startsAt: "2024-05-01T00:00:00.000Z",
            workhour: 5,
            closed: true,
          },
          href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a",
        },
      },
      links: [
        {
          rel: "update",
          description: "지원 승인/거절",
          method: "PUT",
          href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a/applications/a0ef59df-f27b-4659-a2ac-7c668374df69",
          body: {
            status: "accepted | rejected",
          },
        },
      ],
    },
  ],
  links: [
    {
      rel: "self",
      description: "현재 페이지",
      method: "GET",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a/applications?offset=0&limit=10",
    },
    {
      rel: "prev",
      description: "이전 페이지",
      method: "GET",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a/applications?offset=0&limit=10",
    },
    {
      rel: "next",
      description: "다음 페이지",
      method: "GET",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a/applications?offset=10&limit=10",
    },
    {
      rel: "create",
      description: "지원하기",
      method: "POST",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a/applications",
    },
    {
      rel: "shop",
      description: "가게 정보",
      method: "GET",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57",
    },
    {
      rel: "notice",
      description: "공고 정보",
      method: "GET",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a",
    },
  ],
};

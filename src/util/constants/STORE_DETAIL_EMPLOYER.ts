export const STORE_DETAIL_EMPLOYER = {
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
    user: {
      item: {
        id: "52dac023-f435-4655-9b3c-8751afc65a71",
        email: "white@naver.com",
        type: "employer",
      },
      href: "/api/0-1/the-julge/users/52dac023-f435-4655-9b3c-8751afc65a71",
    },
  },
  links: [
    {
      rel: "self",
      description: "가게 정보",
      method: "GET",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57",
    },
    {
      rel: "update",
      description: "가게 정보 수정",
      method: "PUT",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57",
      body: {
        name: "string",
        category: "한식 | 중식 | 일식 | 양식 | 분식 | 카페 | 편의점 | 기타",
        address1:
          "서울시 종로구 | 서울시 중구 | 서울시 용산구 | 서울시 성동구 | 서울시 광진구 | 서울시 동대문구 | 서울시 중랑구 | 서울시 성북구 | 서울시 강북구 | 서울시 도봉구 | 서울시 노원구 | 서울시 은평구 | 서울시 서대문구 | 서울시 마포구 | 서울시 양천구 | 서울시 강서구 | 서울시 구로구 | 서울시 금천구 | 서울시 영등포구 | 서울시 동작구 | 서울시 관악구 | 서울시 서초구 | 서울시 강남구 | 서울시 송파구 | 서울시 강동구",
        address2: "string",
        description: "string",
        imageUrl: "string",
        originalHourlyPay: "number",
      },
    },
    {
      rel: "user",
      description: "가게 주인 정보",
      method: "GET",
      href: "/api/0-1/the-julge/users/52dac023-f435-4655-9b3c-8751afc65a71",
    },
    {
      rel: "notices",
      description: "공고 목록",
      method: "GET",
      href: "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices",
      query: {
        offset: "undefined | number",
        limit: "undefined | number",
      },
    },
  ],
};

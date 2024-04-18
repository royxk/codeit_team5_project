export const SHOP_APPLY_API_RESPONSE_DATA = {
  "offset": 0,
  "limit": 10,
  "count": 2,
  "hasNext": false,
  "items": [
    {
      "item": {
        "id": "48874724-ecc7-4e57-bdb8-d5aa8dcc9028",
        "status": "accepted",
        "createdAt": "2024-04-15T07:21:57.898Z",
        "shop": {
          "item": {
            "id": "52200d57-25a3-4910-9903-e524d1d67a57",
            "name": "음머어 소갈비",
            "category": "한식",
            "address1": "서울시 종로구",
            "address2": "소갈비길",
            "description": "싸고 맛있는집",
            "imageUrl": "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/ce383d5a-c9f3-43ff-84ce-4844dcbeb1e2-aj-McsNra2VRQQ-unsplash.jpg",
            "originalHourlyPay": 50000
          },
          "href": "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57"
        },
        "notice": {
          "item": {
            "id": "ba1e7554-0b2b-4583-9a6f-a16dae71b46a",
            "hourlyPay": 500000,
            "description": "string",
            "startsAt": "2024-05-01T00:00:00.000Z",
            "workhour": 5,
            "closed": true
          },
          "href": "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a"
        }
      },
      "links": [
        {
          "rel": "shop",
          "description": "가게 정보",
          "method": "GET",
          "href": "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57"
        },
        {
          "rel": "notice",
          "description": "공고 정보",
          "method": "GET",
          "href": "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a"
        }
      ]
    },
    {
      "item": {
        "id": "a0ef59df-f27b-4659-a2ac-7c668374df69",
        "status": "pending",
        "createdAt": "2024-04-15T07:18:02.283Z",
        "shop": {
          "item": {
            "id": "52200d57-25a3-4910-9903-e524d1d67a57",
            "name": "음머어 소갈비",
            "category": "한식",
            "address1": "서울시 종로구",
            "address2": "소갈비길",
            "description": "싸고 맛있는집",
            "imageUrl": "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/ce383d5a-c9f3-43ff-84ce-4844dcbeb1e2-aj-McsNra2VRQQ-unsplash.jpg",
            "originalHourlyPay": 50000
          },
          "href": "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57"
        },
        "notice": {
          "item": {
            "id": "ba1e7554-0b2b-4583-9a6f-a16dae71b46a",
            "hourlyPay": 500000,
            "description": "string",
            "startsAt": "2024-05-01T00:00:00.000Z",
            "workhour": 5,
            "closed": true
          },
          "href": "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a"
        }
      },
      "links": [
        {
          "rel": "shop",
          "description": "가게 정보",
          "method": "GET",
          "href": "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57"
        },
        {
          "rel": "notice",
          "description": "공고 정보",
          "method": "GET",
          "href": "/api/0-1/the-julge/shops/52200d57-25a3-4910-9903-e524d1d67a57/notices/ba1e7554-0b2b-4583-9a6f-a16dae71b46a"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": "self",
      "description": "현재 페이지",
      "method": "GET",
      "href": "/api/0-1/the-julge/users/52dac023-f435-4655-9b3c-8751afc65a71/applications?offset=0&limit=10"
    },
    {
      "rel": "prev",
      "description": "이전 페이지",
      "method": "GET",
      "href": "/api/0-1/the-julge/users/52dac023-f435-4655-9b3c-8751afc65a71/applications?offset=0&limit=10"
    },
    {
      "rel": "next",
      "description": "다음 페이지",
      "method": "GET",
      "href": "/api/0-1/the-julge/users/52dac023-f435-4655-9b3c-8751afc65a71/applications?offset=10&limit=10"
    },
    {
      "rel": "user",
      "description": "사용자 정보",
      "method": "GET",
      "href": "/api/0-1/the-julge/users/52dac023-f435-4655-9b3c-8751afc65a71"
    }
  ]
}

export const USER_API_RESPONSE = {
  "items": [
    {
      "item": {
        "id": "string",
        "status": "pending",
        "createdAt": "string",
        "user": {
          "item": {
            "id": "유저1",
            "email": "string",
            "type": "employer | employee",
            "name": "김강현",
            "phone": "010-0000-0000",
            "address": "string",
            "bio": "최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.",
          },
        },
      },
    },
    {
      "item": {
        "id": "string",
        "status": "accepted",
        "createdAt": "string",
        "user": {
          "item": {
            "id": "유저2",
            "email": "string",
            "type": "employer | employee",
            "name": "서혜진",
            "phone": "010-1111-1111",
            "address": "string",
            "bio": "열심히 하겠습니다!",
          },
        },
      },
    },
    {
      "item": {
        "id": "string",
        "status": "rejected",
        "createdAt": "string",
        "user": {
          "item": {
            "id": "유저3",
            "email": "string",
            "type": "employer | employee",
            "name": "주진혁",
            "phone": "010-2222-2222",
            "address": "string",
            "bio": "성실한 자세로 열심히 일합니다. 한번 경험해 보고 싶어요~",
          },
        },
      },
    },
    {
      "item": {
        "id": "string",
        "status": "canceled",
        "createdAt": "string",
        "user": {
          "item": {
            "id": "유저4",
            "email": "string",
            "type": "employer | employee",
            "name": "장민혁",
            "phone": "010-3333-3333",
            "address": "string",
            "bio": "일을 꼼꼼하게 하는 성격입니다. 도토리 식당에서 일해보고 싶습니다.",
          },
        },
      },
    },
    {
      "item": {
        "id": "string",
        "status": "pending",
        "createdAt": "string",
        "user": {
          "item": {
            "id": "유저5",
            "email": "string",
            "type": "employer | employee",
            "name": "고기훈",
            "phone": "010-4444-4444",
            "address": "string",
            "bio": "하루라도 최선을 다해서 일하겠습니다! 감사합니다.",
          },
        },
      },
    },
  ],
}
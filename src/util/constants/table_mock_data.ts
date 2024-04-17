export const SHOP_APPLY_API_RESPONSE_DATA = {
  "items": [
		{
			"item": {
				"id": "string",
				"status": "pending",
				"createdAt": "string",
				"shop": {
					"item": {
						"id": "string",
		        "name": "너구리네 라면집",
		        "category": "string",
		        "address1": "string",
		        "address2": "string",
		        "description": "string",
		        "imageUrl": "string",
		        "originalHourlyPay": 10000,
					},
					"href": "string"
				},
				"notice": {
					"item": {
						"id": "어쩌구저쩌구",
						"hourlyPay": 15000,
            "description": "string",
            "startsAt": "2023-01-12 10:00 ~ 12:00",
            "workhour": 2,
            "closed": false,
					}
				},
			},
		},
    {
			"item": {
				"id": "string",
				"status": "accepted",
				"createdAt": "string",
				"shop": {
					"item": {
						"id": "string",
		        "name": "너구리네 라면집",
		        "category": "string",
		        "address1": "string",
		        "address2": "string",
		        "description": "string",
		        "imageUrl": "string",
		        "originalHourlyPay": 10000,
					},
					"href": "string"
				},
				"notice": {
					"item": {
						"id": "어쩌구",
						"hourlyPay": 21000,
            "description": "string",
            "startsAt": "2023-01-12 10:00 ~ 22:00",
            "workhour": 12,
            "closed": false,
					}
				},
			},
		},
    {
			"item": {
				"id": "string",
				"status": "rejected",
				"createdAt": "string",
				"shop": {
					"item": {
						"id": "string",
		        "name": "너구리네 라면집",
		        "category": "string",
		        "address1": "string",
		        "address2": "string",
		        "description": "string",
		        "imageUrl": "string",
		        "originalHourlyPay": 10000,
					},
					"href": "string"
				},
				"notice": {
					"item": {
						"id": "저쩌구",
						"hourlyPay": 18000,
            "description": "string",
            "startsAt": "2023-01-12 10:00 ~ 14:00",
            "workhour": 4,
            "closed": false,
					}
				},
			},
		},
    {
			"item": {
				"id": "string",
				"status": "canceled",
				"createdAt": "string",
				"shop": {
					"item": {
						"id": "string",
		        "name": "너구리네 라면집",
		        "category": "string",
		        "address1": "string",
		        "address2": "string",
		        "description": "string",
		        "imageUrl": "string",
		        "originalHourlyPay": 10000,
					},
					"href": "string"
				},
				"notice": {
					"item": {
						"id": "어쩌구저쩌구메롱",
						"hourlyPay": 1000,
            "description": "string",
            "startsAt": "2023-01-12 10:00 ~ 11:00",
            "workhour": 1,
            "closed": false,
					}
				},
			},
		},
	],
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
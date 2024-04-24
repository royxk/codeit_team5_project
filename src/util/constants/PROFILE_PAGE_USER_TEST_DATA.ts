export interface UserApiItem {
  item: UserItem,
  links: [],
}

export interface UserItem {
  id: string;
  email: string;
  type: string;
  name?: string; // 옵셔널 속성
  phone?: string; // 옵셔널 속성
  address?: string; // 옵셔널 속성
  bio?: string; // 옵셔널 속성
  shop: null
  }

export const USER_TEST_DATA: UserApiItem = {
  "item": {
    "id": "dgafdsgahhsehfs1321",
    "email": "npm2@blue.com",
    "type": "employee",
		"name": "양서연", // optional
		"phone": "010-0000-0000", // optional
		"address": "서울시 강남구", // optional
		"bio": "안녕하세요. 열심히 하겠습니다.", // optional
		"shop": null,
  },
  "links": [],
}

// HTTP/1.1 200 OK
// Access-Control-Allow-Credentials: true
// Access-Control-Allow-Headers: *
// Access-Control-Allow-Methods: *
// Access-Control-Allow-Origin: *
// Age: 0
// Cache-Control: public, max-age=0, must-revalidate
// Content-Encoding: gzip
// Content-Type: application/json; charset=utf-8
// Date: Wed, 24 Apr 2024 03:23:45 GMT
// Etag: W/"15nnkwc0pdnsu"
// Server: Vercel
// Strict-Transport-Security: max-age=63072000
// X-Matched-Path: /api/[groupSlug]/[appSlug]/[[...slugs]]
// X-Powered-By: Express
// X-Vercel-Cache: MISS
// X-Vercel-Id: icn1::icn1::bxk49-1713929025734-f3e261d8ea0c
// Connection: close
// Transfer-Encoding: chunked

// {
//   "item": {
//     "id": "22b70831-ad58-4651-a696-cbdfa6e4442f",
//     "email": "gogo11@naver.com",
//     "type": "employee",
//     "shop": null
//   },
//   "links": [
//     {
//       "rel": "self",
//       "description": "사용자 정보",
//       "method": "GET",
//       "href": "/api/4-5/the-julge/users/22b70831-ad58-4651-a696-cbdfa6e4442f"
//     },
//     {
//       "rel": "update",
//       "description": "사용자 정보 수정",
//       "method": "PUT",
//       "href": "/api/4-5/the-julge/users/22b70831-ad58-4651-a696-cbdfa6e4442f",
//       "body": {
//         "name": "string",
//         "phone": "string",
//         "address": "서울시 종로구 | 서울시 중구 | 서울시 용산구 | 서울시 성동구 | 서울시 광진구 | 서울시 동대문구 | 서울시 중랑구 | 서울시 성북구 | 서울시 강북구 | 서울시 도봉구 | 서울시 노원구 | 서울시 은평구 | 서울시 서대문구 | 서울시 마포구 | 서울시 양천구 | 서울시 강서구 | 서울시 구로구 | 서울시 금천구 | 서울시 영등포구 | 서울시 동작구 | 서울시 관악구 | 서울시 서초구 | 서울시 강남구 | 서울시 송파구 | 서울시 강동구",
//         "bio": "string"
//       }
//     },
//     {
//       "rel": "applications",
//       "description": "지원 목록",
//       "method": "GET",
//       "href": "/api/4-5/the-julge/users/22b70831-ad58-4651-a696-cbdfa6e4442f/applications",
//       "query": {
//         "offset": "undefined | number",
//         "limit": "undefined | number"
//       }
//     },
//     {
//       "rel": "alerts",
//       "description": "알림 목록",
//       "method": "GET",
//       "href": "/api/4-5/the-julge/users/22b70831-ad58-4651-a696-cbdfa6e4442f/alerts"
//     }
//   ]
// }
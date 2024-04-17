import { deleteCookie, getCookie } from "@/util/cookieSetting";
import { BASE_URL_WITH_TEAM, ENDPOINT, SEARCH_NOTICE, USERS_URL } from "@/util/constants/API_VALUES";


/**
 * 분류의 타입 입니다.
 */
export type Category =
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "분식"
  | "카페"
  | "편의점"
  | "기타";

/**
 * 상태의 타입 입니다.
 */
export type Status = "pending" | "accepted" | "rejected" | "canceled";

/**
 * 주소의 타입입니다.
 */
export type Address =
  | "서울시 종로구"
  | "서울시 중구"
  | "서울시 용산구"
  | "서울시 성동구"
  | "서울시 광진구"
  | "서울시 동대문구"
  | "서울시 중랑구"
  | "서울시 성북구"
  | "서울시 강북구"
  | "서울시 도봉구"
  | "서울시 노원구"
  | "서울시 은평구"
  | "서울시 서대문구"
  | "서울시 마포구"
  | "서울시 양천구"
  | "서울시 강서구"
  | "서울시 구로구"
  | "서울시 금천구"
  | "서울시 영등포구"
  | "서울시 동작구"
  | "서울시 관악구"
  | "서울시 서초구"
  | "서울시 강남구"
  | "서울시 송파구"
  | "서울시 강동구";
/**
 * 유저 타입의 타입 입니다.
 */
export type UserType = "employee" | "employer";

/**
 * 모든 쿼리에 대응하는 객체의 타입입니다.
 * @typedef {object} Query
 * @property {number} [offset] - 조회 시작 기준
 * @property {number} [limit] - 조회 개수
 * @property {string} [address] - 위치 설정
 * @property {string} [keyword] - 검색어 설정
 * @property {string} [startsAtGte] - 시작 시점 설정 (RFC 3339 형식, 현재 시간 이후로만 설정 가능)
 * @property {number} [hourlyPayGte] - 금액 설정
 * @property {string} [sort] - 정렬 기준()
 */
export interface Query {
  [key: string]: number | string | undefined;
  offset?: number;
  limit?: number;
  address?: string;
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: "time" | "pay" | "hour" | "shop";
}

/**
 * 회원가입에 필요한 바디 객체의 타입입니다.
 */
export interface SignupBody {
  email: string;
  password: string;
  type: UserType;
}

/**
 * 로그인에 필요한 바디 객체의 타입입니다.
 */
export interface SigninBody {
  email: string;
  password: string;
}

/**
 * 내 정보 수정에 필요한 바디 객체의 타입입니다.
 */
export interface MydataEditBody {
  name: string;
  phone: string;
  address: Address;
  bio: string;
}
/**
 * 가게등록 및 수정에 필요한 바디 객체의 타입입니다.
 */
export interface ShopBody {
  name: string;
  category: Category;
  address1: Address;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}
/**
 * 공고등록에 필요한 바디 객체의 타입입니다.
 * @param startsAt - 타입이 string 이지만 양식은 '2024-05-01T00:00:00Z' 형태여야만 합니다. iso국제 표준 시간 형식입니다.
 */
export interface AddNoticeBody {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

/**
 * 가게의 특정 공고 수정에 필요한 바디 객체의 타입입니다.
 */
export interface NoticeBody {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

/**
 * 가게의 특정 공고 지원 승인, 거절 또는 취소에 필요한 바디 객체의 타입입니다.
 */
export interface StatusBody {
  status: "accepted" | "rejected" | "canceled";
}

/**
 * Presigned URL 생성에 필요한 바디 객체의 타입입니다.
 */
export interface ImageBody {
  name: string;
}



/**
 * 모든 API 요청을 가로채 쿠키의 액세스 토큰이 확인되면 인증을 추가하고 응답을 처리하는 함수입니다.
 * @param href - 요청할 주소 값입니다.
 * @param options - 요청에 사용할 옵션 객체입니다. 기본 값은 빈 객체입니다.
 * @returns - 성공 시 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환하고, 실패 시 오류 메시지를 담은 Error 객체를 반환합니다.
 */
async function fetchWithToken(href: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers as HeadersInit);
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  if (!headers.has("Content-Type") && options.body) {
    headers.append("Content-Type", "application/json");
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(href, mergedOptions);

  if (!response.ok) {
    const errorResponse = await response.json();
    return new Error(errorResponse.message);
  }

  return response.json();
}

/**
 * GET 요청에 대응하는 함수입니다. 주어진 주소, 쿼리 객체를 사용해 요청을 보냅니다.
 * @param href - 요청할 주소 값입니다.
 * @param query - 요청에 포함할 쿼리 객체입니다. 쿼리 객체에 속성이 존재한다면 주소에 추가 됩니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
async function getApiResponse(href: string, query?: Query) {
  if (query) {
    const queryParams = new URLSearchParams();
    for (const key in query) {
      if (query[key] !== undefined) {
        queryParams.append(key, query[key]!.toString());
      }
    }

    const queryString = queryParams.toString();
    if (queryString) {
      href += `?${queryString}`;
    }
  }

  const body = await fetchWithToken(href);
  return body;
}

/**
 * POST 요청에 대응하는 함수입니다. 주어진 주소, 바디 객체, 쿼리 객체를 사용해 요청을 보냅니다.
 * @param href - 요청할 주소 값입니다.
 * @param bodyData - 요청에 포함할 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
async function postApiResponse(href: string, bodyData?: Object) {
  const body = await fetchWithToken(href, {
    method: "POST",
    body: JSON.stringify(bodyData),
  });
  return body;
}

/**
 * PUT 요청에 대응하는 함수입니다. 주어진 주소, 바디 객체, 쿼리 객체를 사용해 요청을 보냅니다.
 * @param href - 요청할 주소 값입니다.
 * @param bodyData - 요청에 포함할 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
async function putApiResponse(href: string, bodyData?: Object) {
  const body = await fetchWithToken(href, {
    method: "PUT",
    body: JSON.stringify(bodyData),
  });
  return body;
}

/**
 * 공고 조회 API 함수입니다.
 * @param query - 요청에 포함 될 수도 있는 쿼리 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function searchNoticeApiResponse(query?: Query) {
  const url = SEARCH_NOTICE;
  return query ? getApiResponse(url, query) : getApiResponse(url);
}

/**
 * 회원가입 API 함수입니다. 주어진 바디 객체를 사용해 요청을 보냅니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function signupApiResponse(body: SignupBody) {
  const url = BASE_URL_WITH_TEAM + ENDPOINT.users;
  return postApiResponse(url, body);
}

/**
 * 로그인 API 함수입니다. 주어진 바디 객체를 사용해 요청을 보냅니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function signinApiResponse(body: SigninBody) {
  const url = BASE_URL_WITH_TEAM + ENDPOINT.token;
  return postApiResponse(url, body);
}

/**
 * 로그아웃 함수입니다. api 함수가 아니지만 로그아웃 기능을 합니다.
 */
export function logout() {
  deleteCookie("accessToken");
  deleteCookie("uid");
  deleteCookie("sid");
}

/**
 * 내 정보 조회 API 함수입니다. 주어진 바디 객체를 사용해 요청을 보냅니다.
 * @param userId - 요청에 포함될 유저id 값입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function mydataApiResponse(userId: string) {
  const url = USERS_URL + userId;
  return getApiResponse(url);
}

/**
 * 내 정보 수정 API 함수입니다. 주어진 바디 객체를 사용해 요청을 보냅니다. 이 함수는 프로필을 처음에 등록할 때도 사용합니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function mydataEditApiResponse(body: MydataEditBody) {
  const uid = getCookie("uid");
  const url = USERS_URL + uid;
  return putApiResponse(url, body);
}

/**
 * 유저의 알림 목록 조회 API 함수입니다.
 * @param userId - 요청에 포함될 유저id 값입니다.
 * @param query - 요청에 포함 될 수도 있는 쿼리 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function alertApiResponse(userId: string, query?: Query) {
  const url = `${USERS_URL}${userId}${ENDPOINT.alerts}`;
  return query ? getApiResponse(url, query) : getApiResponse(url);
}

/**
 * 알림 읽음 처리 API 함수입니다. 주어진 alertId와 바디 객체를 사용해 요청을 보냅니다. 아직 테스트 하지 못했습니다. 이유는 alert를 먼저 보내야 하기 때문입니다.
 * @param alertId - 요청에 포함될 alertId 값입니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function alertReadApiResponse(alertId: string) {
  const uid = getCookie("uid");
  const url = USERS_URL + uid + ENDPOINT.alerts + alertId;
  return putApiResponse(url);
}

//가게 등록 하고 공고 등록 하고 공고에 지원하는 순으로 api 요청 만들어 테스트 해보자.

/**
 * 가게 등록 API 함수입니다. 주어진 바디 객체를 사용해 요청을 보냅니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function createShopApiResponse(body: ShopBody) {
  const url = BASE_URL_WITH_TEAM + ENDPOINT.shops;
  return postApiResponse(url, body);
}

/**
 * 가게 정보 조회 API 함수입니다. 주어진 가게id 값을 사용해 요청을 보냅니다.
 * @param shopId - 요청에 포함될 가게id 입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function searchShopInformationApiResponse(shopId: string) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}`;
  return getApiResponse(url);
}

/**
 * 가게 정보 수정 API 함수입니다. 주어진 가게id 값과 바디 객체를 사용해 요청을 보냅니다.
 * @param shopId - 요청에 포함될 가게id 입니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function editShopInformationApiResponse(shopId: string, body: ShopBody) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}`;
  return putApiResponse(url, body);
}

/**
 * 가게의 공고 등록 API 함수입니다. 주어진 가게id 값과 바디 객체를 사용해 요청을 보냅니다.
 * @param shopId - 요청에 포함될 가게id 값입니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function addNoticeApiResponse(shopId: string, body: AddNoticeBody) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}${ENDPOINT.notices}`;
  return postApiResponse(url, body);
}

/**
 * 가게의 공고 목록 조회 API 함수입니다. 주어진 가게id 값을 사용해 요청을 보냅니다.
 * @param shopId - 요청에 포함될 가게id 값입니다.
 * @param query - 요청에 포함 될 수도 있는 쿼리 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function searchShopNoticeApiResponse(shopId: string, query?: Query) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}${ENDPOINT.notices}`;
  return query ? getApiResponse(url, query) : getApiResponse(url);
}

/**
 * 가게의 특정 공고 조회 API 함수입니다. 주어진 가게id 값과 공고id 값을 사용해 요청을 보냅니다.
 * @param shopId - 요청에 포함될 가게id 값입니다.
 * @param noticeId - 요청에 포함될 공고id 값입니다.
 * @param query - 요청에 포함 될 수도 있는 쿼리 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function searchSelectedNoticeApiResponse(
  shopId: string,
  noticeId: string,
  query?: Query
) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}${ENDPOINT.notices}/${noticeId}`;
  return query ? getApiResponse(url, query) : getApiResponse(url);
}

/**
 * 가게의 특정 공고 수정 API 함수입니다. 주어진 가게id 값, 공고id 값 및 바디 객체를 사용해 요청을 보냅니다.
 * @param shopId - 요청에 포함될 가게id 값입니다.
 * @param noticeId - 요청에 포함될 공고id 값입니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function editSelectedNoticeApiResponse(
  shopId: string,
  noticeId: string,
  body: NoticeBody
) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}${ENDPOINT.notices}/${noticeId}`;
  return putApiResponse(url, body);
}

/**
 * 가게의 특정 공고의 지원 목록 조회 API 함수입니다. 주어진 가게id 값과 공고id 값을 사용해 요청을 보냅니다.
 * @param shopId - 요청에 포함될 가게id 값입니다.
 * @param noticeId - 요청에 포함될 공고id 값입니다.
 * @param query - 요청에 포함될 수도 있는 쿼리 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function searchSelectedNoticeApplyApiResponse(
  shopId: string,
  noticeId: string,
  query?: Query
) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}${ENDPOINT.notices}/${noticeId}${ENDPOINT.applications}`;
  return query ? getApiResponse(url, query) : getApiResponse(url);
}

/**
 * 가게의 특정 공고 지원 등록 API 함수입니다. 주어진 가게id 값과 공고id 값을 사용해 요청을 보냅니다.
 * 특이하게 post요청임에도 body값을 보내지 않습니다
 * @param shopId - 요청에 포함될 가게id 값입니다.
 * @param noticeId - 요청에 포함될 공고id 값입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function selectedNoticeApplyApiResponse(
  shopId: string,
  noticeId: string
) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}${ENDPOINT.notices}/${noticeId}${ENDPOINT.applications}`;
  return postApiResponse(url);
}

/**
 * 가게의 특정 공고 지원 승인, 거절 또는 취소 API 함수입니다. 주어진 가게id 값, 공고id 값, 공고지원id 값과 바디 객체를 사용해 요청을 보냅니다.
 * @param shopId - 요청에 포함될 가게id 값입니다.
 * @param noticeId - 요청에 포함될 공고id 값입니다.
 * @param noticeApplyId - 요청에 포함될 공고지원id 값입니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * 가게 주인만 `accepted`, `rejected` 설정 가능
 * 공고 지원자만 `canceled` 설정 가능
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function selectedNoticeApplyStatusSettingApiResponse(
  shopId: string,
  noticeId: string,
  noticeApplyId: string,
  body: StatusBody
) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.shops}/${shopId}${ENDPOINT.notices}/${noticeId}${ENDPOINT.applications}/${noticeApplyId}`;
  return putApiResponse(url, body);
}

/**
 * 유저의 지원 목록 조회 API 함수입니다. 주어진 가게id 값과 공고id 값을 사용해 요청을 보냅니다.
 * @param userId - 요청에 포함될 유저id 값입니다.
 * @param query - 요청에 포함될 수도 있는 쿼리 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function searchUserApplyApiResponse(userId: string, query?: Query) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.users}/${userId}${ENDPOINT.applications}`;
  return query ? getApiResponse(url, query) : getApiResponse(url);
}

/**
 * Presigned URL 생성 API 함수입니다. 주어진 가게id 값과 공고id 값을 사용해 요청을 보냅니다.
 * @param body - 요청에 포함될 바디 객체입니다.
 * @returns - 서버로부터 받은 JSON 응답을 담은 프로미스 객체를 반환합니다.
 */
export function createImageApiResponse(body: ImageBody) {
  const url = `${BASE_URL_WITH_TEAM}${ENDPOINT.images}`;
  return postApiResponse(url, body);
}

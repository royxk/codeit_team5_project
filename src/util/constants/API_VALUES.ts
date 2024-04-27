//엔드 포인트 상수입니다.
export const ENDPOINT = {
  token: "/token",
  users: "/users",
  notices: "/notices",
  shops: "/shops",
  alerts: "/alerts/",
  applications: "/applications",
  images: "/images",
};
/**
 * 경로 관련 상수입니다.
 * @param BASE_URL - 기본 경로입니다.
 * @param BASE_URL_WITH_TEAM - 기본 경로에 '/api/4-5/the-julge' 를 포함하는 경로입니다.
 * @param SEARCH_NOTICE - BASE_URL_WITH_TEAM 경로에 notices 엔드포인트를 포함하는 경로입니다.
 * @param USERS_URL - BASE_URL_WITH_TEAM 경로에 users 엔드포인트를 포함하는 경로입니다.
 */
export const BASE_URL = "https://bootcamp-api.codeit.kr";
export const BASE_URL_WITH_TEAM = `${BASE_URL}/api/4-5/the-julge`;
export const SEARCH_NOTICE = `${BASE_URL_WITH_TEAM}${ENDPOINT.notices}`;
export const USERS_URL = `${BASE_URL_WITH_TEAM}${ENDPOINT.users}/`;

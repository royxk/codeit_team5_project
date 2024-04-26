interface InputValuesType {
  [key: string]: string;
}

export const INPUT_TYPES: InputValuesType = {
  DEFAULT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  PASSWORD_CHECK: "password",
  DATE: "datetime-local",
  BASE_WAGE: "number",
  WAGE: "number",
  WORK_HOUR: "number",
  ADDRESS: "text",
  STORE_NAME: "text",
  NAME: "text",
  PHONE_NUMBER: "text",
  FAVOR_ADDRESS: "text",
};

export const INPUT_LABELS: InputValuesType = {
  DEFAULT: "기본 라벨",
  EMAIL: "이메일",
  PASSWORD: "비밀번호",
  PASSWORD_CHECK: "비밀번호 확인",
  DATE: "시작 일시*",
  BASE_WAGE: "기본 시급*",
  WAGE: "시급*",
  WORK_HOUR: "업무 시간*",
  WORK_TYPES: "분류*",
  STORE_NAME: "가게 이름*",
  MAIN_ADDRESS: "주소",
  ADDRESS: "상세 주소",
  NAME: "이름*",
  PHONE_NUMBER: "연락처*",
  FAVOR_ADDRESS: "선호 지역",
};

export const INPUT_PLACEHOLDER: InputValuesType = {
  DEFAULT: "inputType을 지정해 주세요",
  EMAIL: "이메일을 입력해 주세요.",
  PASSWORD: "비밀번호를 입력해 주세요.",
  PASSWORD_CHECK: "비밀번호를 동일하게 입력해 주세요.",
  WAGE: "시급을 입력해 주세요.",
  WORK_HOUR: "업무 시간을 입력해 주세요.",
  STORE_NAME: "가게의 이름을 입력해 주세요.",
  ADDRESS: "상세 주소를 입력해 주세요.",
  BASE_WAGE: "기본 시급을 입력해 주세요.",
  NAME: "이름을 입력해 주세요.",
  PHONE_NUMBER: "연락처를 입력해 주세요.",
};

export const INPUT_LAST_WORD: InputValuesType = {
  DEFAULT: "기본 어미",
  WAGE: "원",
  WORK_HOUR: "시간",
};

export const INPUT_ERROR_TYPE: InputValuesType = {
  DEFAULT: "inputType을 지정해주세요.",
  EMAIL_INVALID_REGEX: "잘못된 이메일 형식입니다.",
  EMAIL_DUPLICATED: "동일한 이메일이 이미 가입되어 있습니다.",
  EMAIL_NOT_MATCH: "이메일을 확인해주세요.",
  PASSWORD_NOT_MATCH: "비밀번호를 확인해주세요.",
  PASSWORD_INVALID_REGEX: "8자 이상 작성해주세요.",
  PASSWORD_CHECK_NOT_MATCHED: "비밀번호가 일치하지 않습니다.",
  BLANK_REQUIRE_VALUE: "*은 필수 항목입니다.",
  INVALID_PHONE_NUMBER: "전화번호를 확인해 주세요."
};

export const INPUT_SELECT_TYPE: string[] = [
  "MAIN_ADDRESS",
  "WORK_TYPES",
  "FAVOR_ADDRESS",
];

export const INPUT_SELECT_DATA_LIST: { [key: string]: string[] } = {
  MAIN_ADDRESS: [
    "서울시 종로구",
    "서울시 중구",
    "서울시 용산구",
    "서울시 성동구",
    "서울시 광진구",
    "서울시 동대문구",
    "서울시 중랑구",
    "서울시 성북구",
    "서울시 강북구",
    "서울시 도봉구",
    "서울시 노원구",
    "서울시 은평구",
    "서울시 서대문구",
    "서울시 마포구",
    "서울시 양천구",
    "서울시 강서구",
    "서울시 구로구",
    "서울시 금천구",
    "서울시 영등포구",
    "서울시 동작구",
    "서울시 관악구",
    "서울시 서초구",
    "서울시 강남구",
    "서울시 송파구",
    "서울시 강동구",
  ],
  WORK_TYPES: [
    "한식",
    "중식",
    "일식",
    "양식",
    "분식",
    "카페",
    "편의점",
    "기타",
  ],
  FAVOR_ADDRESS: [
    "서울시 종로구",
    "서울시 중구",
    "서울시 용산구",
    "서울시 성동구",
    "서울시 광진구",
    "서울시 동대문구",
    "서울시 중랑구",
    "서울시 성북구",
    "서울시 강북구",
    "서울시 도봉구",
    "서울시 노원구",
    "서울시 은평구",
    "서울시 서대문구",
    "서울시 마포구",
    "서울시 양천구",
    "서울시 강서구",
    "서울시 구로구",
    "서울시 금천구",
    "서울시 영등포구",
    "서울시 동작구",
    "서울시 관악구",
    "서울시 서초구",
    "서울시 강남구",
    "서울시 송파구",
    "서울시 강동구",
  ],
};

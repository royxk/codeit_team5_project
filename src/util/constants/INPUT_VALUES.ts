interface InputValuesType {
  [key: string]: string;
}

export const INPUT_TYPES: InputValuesType = {
  DEFAULT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  PASSWORD_CHECK: "password",
  DATE: "date",
  WAGE: "number",
  WORK_HOUR: "number",
  ADDRESS: "text",
};

export const INPUT_LABELS: InputValuesType = {
  DEFAULT: "기본 라벨",
  EMAIL: "이메일",
  PASSWORD: "비밀번호",
  PASSWORD_CHECK: "비밀번호 확인",
  DATE: "시작 일시*",
  WAGE: "시급*",
  WORK_HOUR: "업무 시간",
  WORK_TYPES: "분류*",
  MAIN_ADDRESS: "주소",
  ADDRESS: "상세 주소",
};

export const INPUT_PLACEHOLDER: InputValuesType = {
  DEFAULT: "inputType을 지정해 주세요",
  EMAIL: "이메일을 입력해 주세요.",
  PASSWORD: "비밀번호를 입력해 주세요.",
  PASSWORD_CHECK: "비밀번호를 동일하게 입력해 주세요.",
  WAGE: "시급을 입력해 주세요.",
  WORK_HOUR: "업무 시간을 입력해 주세요.",
};

export const INPUT_LAST_WORD: InputValuesType = {
  DEFAULT: "기본 어미",
  WAGE: "원",
};

export const INPUT_ERROR_TYPE: InputValuesType = {
  DEFAULT: "inputType을 지정해주세요.",
  EMAIL_INVALID_REGEX: "잘못된 이메일 형식입니다.",
  EMAIL_DUPLICATED: "동일한 이메일이 이미 가입되어 있습니다.",
  EMAIL_NOT_MATCH: "이메일을 확인해주세요.",
  PASSWORD_NOT_MATCH: "비밀번호를 확인해주세요.",
  PASSWORD_INVALID_REGEX: "8자 이상 작성해주세요.",
  PASSWORD_CHECK_NOT_MATCHED: "비밀번호가 일치하지 않습니다.",
};

export const INPUT_SELECT_TYPE: string[] = ["mainAddress", "workTypes"];

interface InputValuesType {
  [key: string]: string;
}

export const INPUT_TYPES: InputValuesType = {
  email: "email",
  password: "password",
  passwordCheck: "password",
  date: "date",
  workHour: "number",
  wage: "number",
};

export const INPUT_LABELS: InputValuesType = {
  default: "기본 라벨",
  email: "이메일",
  password: "비밀번호",
  passwordCheck: "비밀번호 확인",
  date: "시작 일시*",
  types: "분류*",
  wage: "시급*",
  workHour: "업무 시간",
};

export const INPUT_PLACEHOLDER: InputValuesType = {
  default: "inputType을 지정해 주세요",
  email: "이메일을 입력해 주세요.",
  password: "비밀번호를 입력해 주세요.",
  passwordCheck: "비밀번호를 동일하게 입력해 주세요.",
  wage: "시급을 입력해 주세요.",
  workHour: "업무 시간을 입력해 주세요.",
};

export const INPUT_LAST_WORD: InputValuesType = {
  default: "기본 어미",
  wage: "원",
};

export const INPUT_ERROR_TYPE: InputValuesType = {
  default: "inputType을 지정해주세요.",
};

export const INPUT_SELECT_TYPE: string[] = ["types"];

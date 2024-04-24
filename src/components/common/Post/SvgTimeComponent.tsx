import React from "react";

type SvgTimeComponentProps = {
  color: string;
};

const SvgTimeComponent = ({ color }: SvgTimeComponentProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C15.5225 0 20 4.47754 20 10C20 15.5225 15.5225 20 10 20C4.47754 20 0 15.5225 0 10C0 4.47754 4.47754 0 10 0ZM8.61328 4.96745H9.83561C10.0586 4.96745 10.2425 5.15137 10.2425 5.37435V10.0846H14.541C14.7656 10.0846 14.9479 10.2686 14.9479 10.4915V11.7139C14.9479 11.9385 14.764 12.1208 14.541 12.1208H8.20475V5.37435C8.20475 5.14974 8.38867 4.96745 8.61328 4.96745ZM10 2.27051C14.2692 2.27051 17.7295 5.73079 17.7295 10C17.7295 14.2692 14.2692 17.7295 10 17.7295C5.73079 17.7295 2.27051 14.2692 2.27051 10C2.27051 5.73242 5.73079 2.27051 10 2.27051Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgTimeComponent;

import React from "react";
type BasicFilterSvgProps = {
  pathData: string;
};
const BasicFilterSvg = ({ pathData }: BasicFilterSvgProps) => (
  <svg
    className="mt-2"
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
  >
    <path d={pathData} fill="#111322" />
  </svg>
);

export default BasicFilterSvg;

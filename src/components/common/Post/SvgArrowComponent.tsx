import React from "react";

interface SvgArrowComponentProps {
  color?: string;
};

const SvgArrowComponent = ({ color }: SvgArrowComponentProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5001 16.6668H7.50013V10.0001H3.4668L10.0001 3.4668L16.5335 10.0001H12.5001V16.6668Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgArrowComponent;

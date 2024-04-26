import type { Address } from "@/util/api";
import React from "react";

interface AdvancedFilterCloseSvgProps {
  location: Address;
  onClick: (location: Address) => void;
}

const AdvancedFilterCloseSvg = ({
  location,
  onClick,
}: AdvancedFilterCloseSvgProps) => {
  return (
    <svg
      className="hover:cursor-pointer"
      onClick={() => onClick(location)}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_6416_6303)">
        <path
          d="M12.2 3.80665C11.94 3.54665 11.52 3.54665 11.26 3.80665L7.99998 7.05998L4.73998 3.79998C4.47998 3.53998 4.05998 3.53998 3.79998 3.79998C3.53998 4.05998 3.53998 4.47998 3.79998 4.73998L7.05998 7.99998L3.79998 11.26C3.53998 11.52 3.53998 11.94 3.79998 12.2C4.05998 12.46 4.47998 12.46 4.73998 12.2L7.99998 8.93998L11.26 12.2C11.52 12.46 11.94 12.46 12.2 12.2C12.46 11.94 12.46 11.52 12.2 11.26L8.93998 7.99998L12.2 4.73998C12.4533 4.48665 12.4533 4.05998 12.2 3.80665Z"
          fill="#EA3C12"
        />
      </g>
      <defs>
        <clipPath id="clip0_6416_6303">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AdvancedFilterCloseSvg;

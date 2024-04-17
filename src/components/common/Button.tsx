import React, { MouseEventHandler } from "react";

type Props = {
  size: Size;
  color: Color;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

type Color = "red" | "white" | "gray";
type Size = "full" | "large" | "medium" | "small";

function colorCssString(color: Color) {
  let colorCss;
  switch (color) {
    case "red":
      colorCss = "bg-btn-red text-white";
      break;

    case "white":
      colorCss = "bg-white text-btn-red border-[1px] border-btn-red";
      break;

    case "gray":
      colorCss = "bg-gray-40 text-white pointer-events-none";
      break;

    default:
      colorCss = "bg-btn-red text-white";
      break;
  }
  return colorCss;
}

function sizeCssString(size: Size) {
  let sizeCss;
  switch (size) {
    case "full":
      sizeCss = "w-full py-[14px] font-bold leading-5 ";
      break;
    case "large":
      sizeCss = "px-[136px] py-[14px] font-bold leading-5";
      break;

    case "medium":
      sizeCss = "px-5 py-[10px] font-bold text-sm min-w-20";
      break;

    case "small":
      sizeCss = "px-3 py-2 text-xs";
      break;

    default:
      sizeCss = "px-[136px] py-[14px] font-bold leading-5";
      break;
  }
  return sizeCss;
}

const Button = ({
  size = "large",
  color = "red",
  className = "",
  onClick,
  children,
}: Props) => {
  const colorCss = colorCssString(color);
  const sizeCss = sizeCssString(size);

  return (
    <div
      className={`text-center ${sizeCss === "full" && colorCss} ${sizeCss === "full" && sizeCss} ${color === "gray" ? `cursor-not-allowed` : ``} ${size === "full" ? `w-full` : ``}`}
    >
      <button
        onClick={onClick}
        className={`${sizeCss !== "full" && colorCss} ${sizeCss !== "full" && sizeCss} ${className} rounded-lg`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;

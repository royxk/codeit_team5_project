import React, { KeyboardEventHandler, MouseEventHandler } from "react";

type Props = {
  type?: string;
  size: Size;
  color: Color;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

type Color = "red" | "white" | "gray";

type Size = "full" | "large" | "medium" | "small";

function colorCssString(color: Color) {
  let colorCss;
  switch (color) {
    case "red":
      colorCss = "bg-primary text-white";
      break;

    case "white":
      colorCss = "bg-white text-primary border-[1px] border-primary";
      break;

    case "gray":
      colorCss = "bg-gray-40 text-white cursor-not-allowed";
      break;

    default:
      colorCss = "bg-primary text-white";
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
      sizeCss = "px-5 py-[10px] font-bold text-sm";
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
  type = "button",
  size = "large",
  color = "red",
  className = "",
  onKeyDown,
  onClick,
  children,
}: Props) => {
  const colorCss = colorCssString(color);
  const sizeCss = sizeCssString(size);

  return (
    <button
      type={type === "button" ? "button" : "submit"}
      disabled={color === "gray"}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`${colorCss} ${sizeCss} ${className} min-w-20 rounded-lg`}
    >
      {children}
    </button>
  );
};

export default Button;

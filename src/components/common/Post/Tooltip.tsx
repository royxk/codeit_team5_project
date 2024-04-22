import React from "react";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
};

const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <div className="group relative flex items-center">
      {children}
      <div className="absolute bottom-full mb-2 hidden w-auto whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;

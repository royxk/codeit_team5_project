import React, { ReactNode } from "react";

type Props = { children: ReactNode; isBgWhite: boolean };

const StoreDetailCardBorder = ({ children, isBgWhite }: Props) => {
  return (
    <main
      className={`flex h-[22.25rem] w-full max-w-[60.25rem] flex-row gap-x-8 overflow-hidden rounded-xl border-[1px] border-gray-20 p-6
                tab:h-auto tab:flex-col mob:p-5
    ${isBgWhite ? "bg-white" : "bg-red-10"}`}
    >
      {children}
    </main>
  );
};

export default StoreDetailCardBorder;

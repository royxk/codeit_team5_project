import React, { ReactNode } from "react";

interface ToastProps {
  children: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ children }) => (
  <div className="flex h-12 w-28 items-center justify-center rounded-md bg-red-30 px-4 text-base font-normal text-white">
    {children}
  </div>
);

export default Toast;

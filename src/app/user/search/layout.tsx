import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "",
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  return children;
}

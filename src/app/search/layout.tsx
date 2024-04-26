import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "",
  description: "The React Framework for the Web",
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  return children;
}

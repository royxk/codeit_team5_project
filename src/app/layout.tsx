import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "더 줄게",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

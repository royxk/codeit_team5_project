import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "얹어드림 | 높은 시급으로 빠른 알바",
  description: "높은 시급으로 빠른 알바",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="tab:px-8 mob:px-3">
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}

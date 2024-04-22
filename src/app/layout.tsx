import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/Footer";

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
      <body className="tab:px-8">
        {children}
        <Footer />
      </body>
    </html>
  );
}

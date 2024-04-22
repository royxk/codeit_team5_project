import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/Footer";
import GNB from "@/components/common/GNB";

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
      <body className="tab:px-8 mob:px-3">
        <GNB user="logout" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

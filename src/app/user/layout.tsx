import Footer from "@/components/common/Footer";
import GNB from "@/components/common/GNB";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GNB />
      <main>{children}</main>
      <Footer />
    </>
  );
}

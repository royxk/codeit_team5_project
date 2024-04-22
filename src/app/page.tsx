import CustomNotice from "@/components/home/CustomNotice";
import NoticeMain from "@/components/home/NoticeMain";

export interface NoticeResponse {
  offset: number;
  limit: number;
  address: string[];
  count: number;
  hasNext: boolean;
  items: NoticeItem[];
  links: Link[];
}

interface NoticeItem {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: {
      item: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
      };
      href: string;
    };
  };
  links: Link[];
}

interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
}

export default function Home() {
  return (
    <>
      <section className="flex justify-center bg-red-10 py-[60px]">
        <div className="flex max-w-[964px] flex-col items-center">
          <h1 className="w-[964px] pb-[31px] text-left text-[28px] font-bold tracking-[0.56px]">
            맞춤공고
          </h1>
          <CustomNotice />
        </div>
      </section>
      <NoticeMain />
    </>
  );
}

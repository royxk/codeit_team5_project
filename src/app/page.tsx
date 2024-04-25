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
      <section className="flex justify-center bg-red-10 py-[60px] tab:-mx-8 tab:w-screen tab:px-8 mob:-mx-3 mob:w-screen mob:px-3">
        <div className="mx-auto flex w-[964px] flex-col flex-nowrap items-start tab:w-full">
          <h1 className="pb-[31px] text-left text-[28px] font-bold tracking-[0.56px] mob:text-xl">
            맞춤공고
          </h1>
          <CustomNotice />
        </div>
      </section>
      <NoticeMain />
    </>
  );
}

import BasicFilter from "@/components/home/BasicFilter";
import CustomNotice from "@/components/home/CustomNotice";
import FilterdNotice from "@/components/home/FilterdNotice";
import AdvancedFilterComponent from "@/components/common/AdvancedFilter/AdvancedFilterComponent";

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
      <section className="flex justify-center py-[60px]">
        <div className="flex max-w-[964px] flex-col items-center">
          <div className="flex w-full justify-between pb-[31px] text-left text-[28px] font-bold tracking-[0.56px]">
            <h1>전체공고</h1>
            <div className="flex h-[42px] items-center gap-[10px]">
              <BasicFilter />
              <AdvancedFilterComponent />
            </div>
          </div>
          <FilterdNotice />
        </div>
      </section>
    </>
  );
}

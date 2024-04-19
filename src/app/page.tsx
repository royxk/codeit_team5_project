import BasicFilterButton from "@/components/home/BasicFilterButton";

export default function Home() {
  return (
    <>
      <section className="flex justify-center bg-red-10 py-[60px]">
        <div className="flex max-w-[964px] flex-col items-center">
          <h1 className="w-full pb-[31px] text-left text-[28px] font-bold tracking-[0.56px]">
            맞춤공고
          </h1>
          <div className="inline-flex items-start gap-[14px]">
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
          </div>
        </div>
      </section>
      <section className="flex justify-center py-[60px]">
        <div className="flex max-w-[964px] flex-col items-center">
          <div className="flex w-full justify-between pb-[31px] text-left text-[28px] font-bold tracking-[0.56px]">
            <h1>전체공고</h1>
            <div className="flex items-center gap-[10px]">
              <BasicFilterButton />
              <div>상세 필터</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-[14px] gap-y-[31px]">
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
            <div className="h-[349px] w-[312px] bg-gray-50">카드 컴포넌트</div>
          </div>
        </div>
      </section>
    </>
  );
}

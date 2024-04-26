import EmployerTable from "@/components/common/EmployerTable";
import StoreDetail from "@/components/common/StoreDetail";

const EmployerNoticeDetailPage = () => {
  return (
    <div className="min-h-[calc(100vh-170px)] bg-gray-5">
      <div className="mx-auto max-w-[64.25rem] px-8 py-[3.75rem]">
        <StoreDetail />
      </div>
      <div className="mx-auto max-w-[64.25rem] px-8 py-[3.75rem]">
        <EmployerTable />
      </div>
    </div>
  );
};

export default EmployerNoticeDetailPage;

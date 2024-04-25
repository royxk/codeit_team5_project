import EmployerNoticeForm from "@/components/employer/EmployerNoticeForm";
import FormCloseButton from "@/components/employer/FormCloseButton";
import React from "react";

const EmployerNoticeRegister = () => {
  return (
    <div className="min-h-[calc(100vh-170px)] w-full bg-gray-5">
      <main className="mx-auto max-w-[64.25rem] px-8 py-[3.75rem]">
        <h1 className="h1 mb-8 flex justify-between">
          공고 등록 <FormCloseButton />
        </h1>
        <EmployerNoticeForm />
      </main>
    </div>
  );
};

export default EmployerNoticeRegister;

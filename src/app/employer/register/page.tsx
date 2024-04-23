import StoreRegisterForm from "@/components/employer/StoreRegisterForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmployerRegisterStore = () => {
  return (
    <main className="m-auto min-h-[calc(100vh-10.625rem)] max-w-[64.3125rem] px-8 py-[3.75rem]">
      <div className="h1 mb-8 flex items-center justify-between">
        가게 정보{" "}
        <Link href={"/employer"} className="relative h-8 w-8">
          <Image fill src={"/icons/close.svg"} alt="cancel-register-store" />
        </Link>
      </div>
      <StoreRegisterForm />
    </main>
  );
};

export default EmployerRegisterStore;

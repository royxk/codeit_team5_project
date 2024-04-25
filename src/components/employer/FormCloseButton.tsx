"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const FormCloseButton = () => {
  const router = useRouter();
  console.log(router);
  return (
    <button onClick={() => router.back()} className="relative h-8 w-8">
      <Image fill src={"/close.svg"} alt="close-notice-register" />
    </button>
  );
};

export default FormCloseButton;

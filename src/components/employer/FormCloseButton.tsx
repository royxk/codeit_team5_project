"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const FormCloseButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="relative h-8 w-8 mob:h-6 mob:w-6"
    >
      <Image fill src={"/close.svg"} alt="close-notice-register" />
    </button>
  );
};

export default FormCloseButton;

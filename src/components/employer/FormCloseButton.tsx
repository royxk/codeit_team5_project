"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const FormCloseButton = ({ redirectRoute }: { redirectRoute: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(redirectRoute)}
      className="relative h-8 w-8"
    >
      <Image fill src={"/close.svg"} alt="close-notice-register" />
    </button>
  );
};

export default FormCloseButton;

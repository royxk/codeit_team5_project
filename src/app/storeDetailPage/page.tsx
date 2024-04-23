import StoreDetail from "@/components/common/StoreDetail";
import { STORE_DETAIL_POST } from "@/util/constants/STORE_DETAIL_POST";
import React from "react";

const page = () => {
  return (
    <div>
      <StoreDetail data={STORE_DETAIL_POST} />
    </div>
  );
};

export default page;

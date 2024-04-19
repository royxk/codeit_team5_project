import StoreDetail from "@/components/common/StoreDetail";
import { STORE_DETAIL_EMPLOYER } from "@/util/constants/STORE_DETAIL_EMPLOYER";
import React from "react";

type Props = {};

const StoreDetailPageTest = () => {
  const data = STORE_DETAIL_EMPLOYER;
  const item = Boolean(data) ? data : null;

  return (
    <div className="p-8">
      <StoreDetail item={item} />
    </div>
  );
};

export default StoreDetailPageTest;

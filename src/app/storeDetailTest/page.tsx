import StoreDetail from "@/components/common/StoreDetail";
import { STORE_DETAIL_POST } from "@/util/constants/STORE_DETAIL_POST";
import React from "react";

type Props = {};

const StoreDetailPageTest = () => {
  // const data = STORE_DETAIL_POST;
  const data = null;
  const item = Boolean(data) ? data : null;

  return (
    <div className="p-8">
      <StoreDetail data={item} />
    </div>
  );
};

export default StoreDetailPageTest;

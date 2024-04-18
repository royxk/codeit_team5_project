import Footer from "@/components/common/Footer";
import StoreDetail from "@/components/common/StoreDetail";
import React from "react";

type Props = {};

const StoreDetailPageTest = (props: Props) => {
  return (
    <div className="p-8">
      <StoreDetail isEmployerMainPage={true} />
    </div>
  );
};

export default StoreDetailPageTest;

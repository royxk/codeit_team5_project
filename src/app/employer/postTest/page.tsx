import PostEmployer from "@/components/employer/PostEmployer";
import { STORE_DETAIL_EMPLOYER } from "@/util/constants/STORE_DETAIL_EMPLOYER";
import React from "react";

type Props = {};

const EmployerPostTest = (props: Props) => {
  const data = STORE_DETAIL_EMPLOYER;
  return (
    <div className="max-w-[964px]">
      <PostEmployer data={data} />
    </div>
  );
};

export default EmployerPostTest;

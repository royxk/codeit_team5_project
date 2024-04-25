import PostEmployer from "@/components/employer/PostEmployer";
import { STORE_DETAIL_EMPLOYER } from "@/util/constants/STORE_DETAIL_EMPLOYER";
import React from "react";

type Props = {};

const EmployerPostTest = (props: Props) => {
  const data = STORE_DETAIL_EMPLOYER;
  return (
    <div className="max-w-[60.25rem] tab:max-w-[40.375rem] mob:max-w-[21.9375rem]">
      <PostEmployer shopData={data} />
    </div>
  );
};

export default EmployerPostTest;

import React from "react";

type Props = {};

const Input = (props: Props) => {
  return (
    <div>
      <label className=" mb-2 text-black"></label>
      <input type="text" />
      <p className="ml-2 mt-2 text-red-400">테스트 에러 메시지</p>
    </div>
  );
};

export default Input;

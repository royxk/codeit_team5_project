import React from "react";

type Props = {};

export const metadata = {
  title: "색상 팔레트",
  description: "색상 예시 입니다.",
};

const CssTest = (props: Props) => {
  return (
    <>
      <div className="flex justify-center gap-10">
        <div>
          <h1 className="text-2xl">gray</h1>
          <ul>
            <li className="bg-black text-white">black</li>
            <li className="bg-gray-50">gray-50</li>
            <li className="bg-gray-40">gray-40</li>
            <li className="bg-gray-30 text-black">gray-30</li>
            <li className="bg-gray-20 text-black">gray-20</li>
            <li className="bg-gray-10 text-black">gray-10</li>
            <li className="bg-gray-5 text-black">gray-5</li>
            <li className="bg-white text-black">white</li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl">red</h1>
          <ul>
            <li className="bg-red-40">red-40</li>
            <li className="bg-red-30">red-30</li>
            <li className="bg-red-20">red-20</li>
            <li className="bg-red-10 text-black">red-10</li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl">blue</h1>
          <ul>
            <li className="bg-blue-20">blue-20</li>
            <li className="bg-blue-10 text-black">blue-10</li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl">green</h1>
          <ul>
            <li className="bg-green-20">green-20</li>
            <li className="bg-green-10 text-black">green-10</li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl">kakao</h1>
          <ul>
            <li className="bg-kakao text-black">kakao</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center gap-10 mt-5">
        <h1>폰트 설정</h1>
        <ul>
          <li className="font-Pretendard">프리텐다드</li>
          <li className="font-Pretendard font-normal">두께 400</li>
          <li className="font-Pretendard font-bold">두께 700</li>
        </ul>
        <ul>
          <li>스포카 한 산스</li>
          <li className="font-Spoqa font-normal">두께 400</li>
          <li className="font-Spoqa font-bold">두께 700</li>
        </ul>
      </div>
    </>
  );
};

export default CssTest;

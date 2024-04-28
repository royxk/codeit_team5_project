import Image from "next/image";
import React from "react";

type Props = {};

const ImageLoadingComponents = (props: Props) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gray-20 tab:h-[20.5625rem] mob:max-h-[11.0625rem]">
      <Image
        width={40}
        height={40}
        alt=""
        className="animate-spin"
        src={"/store-detail-sample/loading.png"}
      />
    </div>
  );
};

export default ImageLoadingComponents;

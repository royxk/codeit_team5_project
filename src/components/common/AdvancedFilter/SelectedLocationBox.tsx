import type { Address } from "@/util/api";
import React from "react";
import AdvancedFilterCloseSvg from "./AdvancedFilterCloseSvg";

type SelectedLocationBoxProps = {
  selectedLocations: Address[];
  onClick: (location: Address) => void;
};

const SelectedLocationBox = ({
  selectedLocations,
  onClick: onClick,
}: SelectedLocationBoxProps) => {
  return (
    <div
      className={`flex w-full select-none flex-row flex-wrap  gap-4 px-1.5 py-3`}
    >
      {selectedLocations.map((location, index) => (
        <div
          key={index}
          className={`flex h-9 flex-row items-center justify-between gap-3 rounded-2xl bg-red-10 px-4 font-bold text-primary `}
        >
          {location}
          <AdvancedFilterCloseSvg onClick={onClick} location={location} />
        </div>
      ))}
    </div>
  );
};

export default SelectedLocationBox;

import React from "react";

type SelectedLocationBoxProps = {
  selectedLocations: string[];
  handleClick: (location: string) => void;
};

const SelectedLocationBox = ({
  selectedLocations,
  handleClick,
}: SelectedLocationBoxProps) => {
  return (
    <div
      className={`flex w-full select-none flex-row flex-wrap gap-2 gap-4 px-1.5 py-3`}
    >
      {selectedLocations.map((location, index) => (
        <div
          key={index}
          className={`color-red-20 flex h-9 flex-row items-center justify-between gap-1 gap-3 rounded-2xl bg-red-10 px-4 font-bold text-red-40`}
        >
          {location}
          <div onClick={(e) => handleClick(location)}>x</div>
        </div>
      ))}
    </div>
  );
};

export default SelectedLocationBox;

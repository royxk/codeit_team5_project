import { useEffect } from "react";

export const usePageMetadata = () => {
  const SetMetadata = ({ title }: { title: string }) => {
    useEffect(() => {
      document.title = title || "Default Title";
    }, [title]);
  };

  return { SetMetadata };
};

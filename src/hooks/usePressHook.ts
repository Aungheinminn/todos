import { useState } from "react";
export const usePressHook = ({
  isLongPress,
  setIsLongPress,
}: {
  isLongPress: boolean;
  setIsLongPress: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleMouseDown = () => {
    const timeout = setTimeout(() => {
      setIsLongPress(true);
      console.log("work");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  };
  return {
    isLongPress,
    handleMouseDown,
  };
};

import { useRef, useState } from "react";
export const usePressHook = ({
  mousePressFunction,
  mouseClickFunction,
}: {
  mousePressFunction: () => void;
  mouseClickFunction: () => void;
}) => {
  const [startTime, setStartTime] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseDown = () => {
    setStartTime(Date.now());
    timeoutRef.current = setTimeout(() => {
      console.log("work");
      mousePressFunction();
    }, 500);
  };

  const handleMouseUp = () => {
    const endTime = Date.now();
    const pressDuration = endTime - startTime;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (pressDuration < 500) {
      mouseClickFunction();
    }
  };
  return {
    handleMouseDown,
    handleMouseUp,
  };
};

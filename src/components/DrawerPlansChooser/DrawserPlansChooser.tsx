"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { useState, useRef } from "react";

const DrawserPlansChooser = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<boolean>(false);

  useOutsideClick(ref, () => setFocus(false));
  return (
    <div
      tabIndex={10}
      id="b"
      ref={ref}
      className={`transition-all duration-300 ease-in-out border-2 border-transparent p-1 px-2 rounded-lg ${focus ? "max-h-[200px] border-white" : "max-h-40px"}`}
    >
      <input
        className="w-full p-1 pb-2 bg-transparent border-0 border-b border-b-[#E7E5E4] outline-0"
        onFocus={() => setFocus(true)}
        placeholder="Search..."
      />
      <div className={`transition-all ${focus ? "h-[147px]" : "h-0"}`}></div>
    </div>
  );
};

export default DrawserPlansChooser;

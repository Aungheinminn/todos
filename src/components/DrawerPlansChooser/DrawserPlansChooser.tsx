"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { PlanType } from "@/lib/types/plan.type";
import { useRef } from "react";

const DrawserPlansChooser = ({
  plans,
  searchKey,
  focus,
  setFocus,
  handleSearch,
  handleSelectedPlan,
}: {
  plans: PlanType[];
  searchKey: string;
  focus: boolean;
  setFocus: (focus: boolean) => void;
  handleSearch: (key: string) => void;
  handleSelectedPlan: (plan: PlanType) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setFocus(false));
  return (
    <div
      tabIndex={10}
      onClick={(e) => e.stopPropagation()}
      id="b"
      ref={ref}
      className={`relative transition-all duration-300 ease-in-out border-2 border-transparent p-1 px-2 rounded-lg ${focus ? "max-h-[200px] border-white" : "max-h-40px"}`}
    >
      <input
        className="w-full p-1 pb-2 bg-transparent border-0 border-b border-b-[#E7E5E4] outline-0"
        value={searchKey}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setFocus(true)}
        placeholder="Search..."
      />
      <div className="absolute w-7 h-7 flex justify-center items-center bg-[#58ed18] top-2 right-2 rounded-md">
        <p className="text-black">{plans ? plans.length : 0}</p>
      </div>
      <div
        className={`transition-all overflow-auto mt-2 flex flex-col gap-y-2 ${focus ? "h-[147px]" : "h-0"}`}
      >
        {plans &&
          plans.map((plan, index) => (
            <button
              onClick={() => handleSelectedPlan(plan)}
              key={index}
              className=" transition-all w-full py-1 border border-[#0ea5e9] rounded-md hover:bg-[#0ea5e9]"
            >
              {plan.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default DrawserPlansChooser;

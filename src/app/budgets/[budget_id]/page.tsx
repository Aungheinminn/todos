"use client";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import BudgetLoading from "./loading";
import { useBudgetPopupStore } from "@/lib/budgetPopupStore";
const Budget = () => {
  const router = useParams();
  const { setIsOpen, setType, setBudgetDatas } = useBudgetPopupStore(
    (state) => state,
  );
  const handleDelete = () => {
    setType("delete");
    setIsOpen(true);
    setBudgetDatas({
      _id: router.budget_id,
      process: () => {},
      wallet: "dsa",
    });
  };
  return (
    <Suspense fallback={<BudgetLoading />}>
      <div className="w-full pt-[55px]">
        <p className="text-white" onClick={handleDelete}>
          budget: {router.budget_id}
        </p>
      </div>
    </Suspense>
  );
};
export default Budget;

"use client";
import { Suspense } from "react";
import BudgetsLoading from "./loading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import wallet from "@/assets/wallet_2.svg";
import caretDown from "@/assets/caret_down.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBudgetPopupStore } from "@/lib/budgetPopupStore";
import BudgetRange from "@/components/BudgetRange.tsx/BudgetRange";
import BudgetCard from "@/components/BudgetCard/BudgetCard";

type BudgetHeaderProps = {
  onOpen: () => void;
};

const BudgetHeader: React.FC<BudgetHeaderProps> = ({ onOpen }) => {
  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-3 p-2 pt-[55px]">
      <p className="text-sm">Running Budgets</p>
      <Button className="w-[100px] flex items-center justify-center gap-x-2">
        <Image className="w-6 h-6" src={wallet} alt="transaction wallet" />
        <p>Total</p>
        <Image className="w-4" src={caretDown} alt="caret down" />
      </Button>

      <Button onClick={onOpen}>Create Budget</Button>
    </div>
  );
};

const Budgets = () => {
  const { isOpen, setIsOpen, setType } = useBudgetPopupStore((state) => state);
  const handleOpen = () => {
    setIsOpen(true);
    setType("create");
  };
  return (
    <Suspense fallback={<BudgetsLoading />}>
      <ScrollArea className="h-fit">
        <BudgetHeader onOpen={handleOpen} />
        <div className="px-1">

        <BudgetCard />
        </div>
      </ScrollArea>
    </Suspense>
  );
};

export default Budgets;

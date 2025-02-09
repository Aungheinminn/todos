import { Suspense } from "react";
import BudgetsLoading from "./loading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import wallet from "@/assets/wallet_2.svg";
import caretDown from "@/assets/caret_down.svg";
import { ScrollArea } from "@/components/ui/scroll-area";

const BudgetHeader = () => {
  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-3 p-2 pt-[55px]">
      <p className="text-sm">Running Budgets</p>
      <Button className="w-[100px] flex items-center justify-center gap-x-2">
        <Image className="w-6 h-6" src={wallet} alt="transaction wallet" />
        <p>Total</p>
        <Image className="w-4" src={caretDown} alt="caret down" />
      </Button>

      <Button>Create Budget</Button>
    </div>
  );
};

const Budgets = () => {
  return (
    <Suspense fallback={<BudgetsLoading />}>
      <ScrollArea className="h-fit">
        <BudgetHeader />
      </ScrollArea>
    </Suspense>
  );
};

export default Budgets;

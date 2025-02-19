"use client";
import { useWalletStore } from "@/lib/walletStore";
import { useCurrentUserStore } from "@/lib/userStore";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import wallet from "@/assets/wallet_2.svg";
import caretDown from "@/assets/caret_down.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBudgetPopupStore } from "@/lib/budgetPopupStore";
import BudgetCard from "@/components/BudgetCard/BudgetCard";
import { useBudgetMutation } from "@/lib/budgetMutation";
import { useQuery } from "react-query";
import { getActiveBudgets } from "@/lib/budget.service";
import { BudgetType } from "@/lib/types/budget.type";
import BudgetsLoading from "./loading";
import BudgetBodyLoading from "@/components/BudgetBodyLoading/BudgetBodyLoading";

type BudgetHeaderProps = {
  onOpen: () => void;
};

type BudgetBodyProps = {
  activeBudgets: BudgetType[];
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

const BudgetBody: React.FC<BudgetBodyProps> = ({ activeBudgets }) => {
  return (
    <ScrollArea>
      <div className="px-1 w-full h-[calc(100vh-240px)] flex flex-col gap-y-2">
        {activeBudgets &&
          activeBudgets.map((activeBudget: BudgetType, index: number) => (
            <BudgetCard key={activeBudget._id || index} budget={activeBudget} />
          ))}
      </div>
    </ScrollArea>
  );
};

const Budgets = () => {
  const { currentUser } = useCurrentUserStore((state) => state);
  const { currentWallet } = useWalletStore((state) => state);

  const { data: activeBudgets, isLoading: isActiveBudgetLoading } = useQuery({
    queryFn: () => getActiveBudgets(currentWallet?._id || ""),
    queryKey: ["budgets", currentWallet],
    enabled: !!currentWallet || !!currentUser,
  });

  console.log(activeBudgets);

  const { setIsOpen, setType, budgetDatas } = useBudgetPopupStore(
    (state) => state,
  );
  const { createMutation } = useBudgetMutation();
  const handleOpen = () => {
    setIsOpen(true);
    setType("create");
    budgetDatas.process = createMutation;
  };
  return (
    <Suspense fallback={<BudgetsLoading />}>
      <BudgetHeader onOpen={handleOpen} />
      {isActiveBudgetLoading ? (
         <BudgetBodyLoading />
      ) : (
        <BudgetBody activeBudgets={activeBudgets || []} />
      )}
    </Suspense>
  );
};

export default Budgets;

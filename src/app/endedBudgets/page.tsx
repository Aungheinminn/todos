"use client";
import EndedBudgetsLoading from "@/app/endedBudgets/loading";
import BudgetBodyLoading from "@/components/BudgetBodyLoading/BudgetBodyLoading";
import BudgetCard from "@/components/BudgetCard/BudgetCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getEndedBudgets } from "@/lib/services/budget.service";
import { BudgetType } from "@/lib/types/budget.type";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import { useWalletStore } from "@/lib/stores/walletStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useBudgetMutation } from "@/lib/mutations/budgetMutation";

type EndedBudgetsBodyProps = {
  handleDeleteAllBudgets: () => void;
  endedBudgets: BudgetType[];
};

const EndedBudgetsHeader = () => {
  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-3 p-2 pt-[55px]">
      <p className="text-sm">Ended Budgets</p>
      <Link
        className="bg-primary hover:bg-primary/90 p-2 rounded-md text-sm"
        href={"/budgets"}
      >
        Back to Budgets
      </Link>
    </div>
  );
};

const EndedBudgetsBody: React.FC<EndedBudgetsBodyProps> = ({
  handleDeleteAllBudgets,
  endedBudgets,
}) => {
  return (
    <ScrollArea>
      <div className="w-full flex justify-end items-center p-2">
        <Button
          disabled={endedBudgets.length === 0}
          onClick={handleDeleteAllBudgets}
        >
          Delete All
        </Button>
      </div>
      <div className="px-1 w-full h-[calc(100vh-181px)] flex flex-col gap-y-2">
        {endedBudgets &&
          endedBudgets.map((activeBudget: BudgetType, index: number) => (
            <BudgetCard key={activeBudget._id || index} budget={activeBudget} />
          ))}
      </div>
    </ScrollArea>
  );
};

const EndedBudgets = () => {
  const { currentWallet } = useWalletStore((state) => state);
  const { currentUser } = useCurrentUserStore((state) => state);
  const { deleteAllMutation } = useBudgetMutation();

  const { data, isLoading } = useQuery({
    queryKey: ["endedBudgets", currentWallet],
    queryFn: () => getEndedBudgets(currentWallet?._id || ""),
    enabled: !!currentWallet || !!currentUser,
  });

  const handleDeleteAllBudgets = () => {
    try {
      deleteAllMutation.mutate(currentWallet?._id || "");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Suspense fallback={<EndedBudgetsLoading />}>
      <EndedBudgetsHeader />
      {isLoading ? (
        <BudgetBodyLoading />
      ) : (
        <EndedBudgetsBody
          handleDeleteAllBudgets={handleDeleteAllBudgets}
          endedBudgets={data || []}
        />
      )}
    </Suspense>
  );
};

export default EndedBudgets;

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

type EndedBudgetsBodyProps = {
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
  endedBudgets,
}) => {
  return (
    <ScrollArea>
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
  const { data, isLoading } = useQuery({
    queryKey: ["endedBudgets", currentWallet],
    queryFn: () => getEndedBudgets(currentWallet?._id || ""),
    enabled: !!currentWallet || !!currentUser,
  });
  return (
    <Suspense fallback={<EndedBudgetsLoading />}>
      <EndedBudgetsHeader />
      {isLoading ? (
        <BudgetBodyLoading />
      ) : (
        <EndedBudgetsBody endedBudgets={data || []} />
      )}
    </Suspense>
  );
};

export default EndedBudgets;

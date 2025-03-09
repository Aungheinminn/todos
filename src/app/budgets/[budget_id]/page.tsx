"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import BudgetLoading from "./loading";
import { useBudgetPopupStore } from "@/lib/budgetPopupStore";
import { useWalletStore } from "@/lib/walletStore";
import { useQuery } from "@tanstack/react-query";
import {
  getBudget,
  getBudgetTransactions,
  getTopUsageBudgetTransactions,
} from "@/lib/budget.service";
import { useCurrentUserStore } from "@/lib/userStore";
import { BudgetType } from "@/lib/types/budget.type";
import chevronLeft from "@/assets/chevron_left.svg";
import { Categories } from "@/constants/categories";
import walletIcon from "@/assets/wallet.svg";
import { WalletType } from "@/lib/types/wallet.type";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TransactionType } from "@/lib/types/transaction.type";
import TransactionsLoading from "@/components/TransactionsLoading/TransactionsLoading";
import TransactionsComponent from "@/components/Transactions/Transactions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CurrentBudgetUsage from "@/components/CurrentBudgetUsage/CurrentBudgetUsage";
import TopUsageTransactionsCard from "@/components/TopUsageTransactionsCard/TopUsageTransactionsCard";
import { useBudgetMutation } from "@/lib/budgetMutation";

type BudgetHeaderProps = {
  handleEditBudget: () => void;
};

type BudgetDetailsProps = {
  budget: BudgetType;
  wallet: WalletType;
  isLoading: boolean;
  handleEndBudget: () => void;
  handleDeleteBudget: () => void;
};

type BudgetBodyProps = {
  budget: BudgetType;
  relatedTransactions: TransactionType[];
  topUsageTransactions: TransactionType[];
  isBudgetLoading: boolean;
  isRelatedTransactionsLoading: boolean;
  isTopUsageTransactionsLoading: boolean;
};

type BudgetFooterProps = {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  transactions: TransactionType[];
  isBudgetLoading: boolean;
  isTransactionsLoading: boolean;
};

const BudgetHeader: React.FC<BudgetHeaderProps> = ({ handleEditBudget }) => {
  return (
    <div className="w-full flex justify-between items-center px-2 py-2 mb-2">
      <Link href={"/budgets"} className="flex justify-start items-center">
        <Image className="h-4 w-4" src={chevronLeft} alt="chevron left" />
        <p className="text-base font-normal">Budget</p>
      </Link>
      <button onClick={handleEditBudget}>Edit</button>
    </div>
  );
};

const BudgetDetails: React.FC<BudgetDetailsProps> = ({
  budget,
  wallet,
  isLoading,
  handleEndBudget,
  handleDeleteBudget,
}) => {
  console.log("budget", budget);
  if (isLoading || !wallet || !budget) {
    return <Skeleton className="w-full h-[150px] bg-gray-700 rounded-lg" />;
  }
  return (
    <div className="w-full bg-gray-700 rounded-md px-4 py-4">
      <div className="w-full flex justify-start items-start gap-x-4">
        <Image
          className="w-10 h-10"
          src={Categories.find((cate) => cate.name === budget.category)?.icon}
          alt="transportation"
        />
        <div className="w-full flex flex-col gap-y-4 items-start pb-3">
          <div className="flex flex-col items-start gap-y-1">
            <p className="text-lg text-white">{budget.category}</p>
            <p className="text-xs text-white">{budget.budget || ""}</p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="w-full flex justify-start items-center gap-x-4 pl-4">
          <Image className="h-5 w-5" src={walletIcon} alt="calender" />
          <p className="text-sm text-white">{wallet?.wallet_name || ""}</p>
        </div>
        <Button onClick={handleEndBudget} className="h-[30px]">
          End this Budget
        </Button>
      </div>
      <div className="w-full flex justify-end items-center mt-1">
        <Button
          onClick={handleDeleteBudget}
          className="bg-red-500 h-[30px] hover:bg-red-500 hover:opacity-80"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const BudgetBody: React.FC<BudgetBodyProps> = ({
  budget,
  relatedTransactions,
  topUsageTransactions,
  isBudgetLoading,
  isRelatedTransactionsLoading,
  isTopUsageTransactionsLoading,
}) => {
  const totalUsedTransactions =
    relatedTransactions &&
    relatedTransactions.reduce(
      (acc, current) => Number(acc) + Number(current.transaction),
      0 as number,
    );

  if (
    !budget ||
    !relatedTransactions ||
    !topUsageTransactions ||
    isBudgetLoading ||
    isRelatedTransactionsLoading ||
    isTopUsageTransactionsLoading
  ) {
    return (
      <div className="w-full h-[200px] flex flex-col md:flex-row gap-1">
        <Skeleton className="w-full h-full bg-gray-700 rounded-md" />
        <Skeleton className="w-full h-full bg-gray-700 rounded-md" />
      </div>
    );
  }
  return (
    <div className="w-full h-full md:h-[200px] flex flex-col md:flex-row gap-1">
      <CurrentBudgetUsage total={budget.budget} used={totalUsedTransactions} />
      <TopUsageTransactionsCard transactions={topUsageTransactions} />
    </div>
  );
};

const BudgetFooter: React.FC<BudgetFooterProps> = ({
  limit,
  setLimit,
  transactions,
  isBudgetLoading,
  isTransactionsLoading,
}) => {
  return (
    <Accordion collapsible type="single" className="w-full">
      <AccordionItem removeBorder value="transactions">
        <AccordionTrigger className="w-full hover:no-underline flex items-center justify-between gap-x-4 px-2 border-none outline-none">
          Related Transactions
        </AccordionTrigger>
        <AccordionContent className="overflow-hidden">
          {isBudgetLoading || isTransactionsLoading ? (
            <TransactionsLoading />
          ) : !transactions || transactions.length === 0 ? (
            <p className="w-full text-center text-sm text-white">
              No transactions
            </p>
          ) : (
            <TransactionsComponent
              limit={limit}
              setLimit={setLimit}
              transactions={transactions}
              height="h-fit"
            />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const Budget = () => {
  const router = useParams();
  const { budget_id } = router;
  const { setIsOpen, setType, setBudgetDatas } = useBudgetPopupStore(
    (state) => state,
  );
  const { currentUser } = useCurrentUserStore((state) => state);
  const { currentWallet } = useWalletStore((state) => state);
  const { deleteMutation, editMutation } = useBudgetMutation();

  const [limit, setLimit] = useState<number>(10);

  const { data: budget, isLoading: isBudgetLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: () =>
      getBudget({
        id: budget_id.toString() || "",
        wallet_id: currentWallet?._id || "",
      }),
    enabled: !!currentUser && !!currentWallet && !!budget_id,
  });

  const { data: relatedTransactions, isLoading: isRelatedTransactionsLoading } =
    useQuery({
      queryKey: ["transactions", limit, budget],
      queryFn: () =>
        getBudgetTransactions({
          wallet_id: budget.wallet_id,
          category: budget.category,
          startDate: budget.start_date,
          endDate: budget.end_date,
          limit: limit,
        }),
      enabled: !!budget,
    });

  const {
    data: topUsageTransactions,
    isLoading: isTopUsageTransactionsLoading,
  } = useQuery({
    queryKey: ["top-usage-transactions", budget],
    queryFn: () =>
      getTopUsageBudgetTransactions({
        wallet_id: budget.wallet_id,
        category: budget.category,
        startDate: budget.start_date,
        endDate: budget.end_date,
      }),
    enabled: !!budget,
  });

  const handleEdit = () => {
    setType("edit");
    setIsOpen(true);
    setBudgetDatas({
      id: budget._id,
      budget: budget.budget,
      category: {
        id: 1,
        name: budget.category,
        icon: Categories.find((cate) => cate.name === budget.category)?.icon,
      },
      start_date: budget.start_date,
      end_date: budget.end_date,
      process: editMutation,
      wallet: {
        id: budget.wallet_id,
        wallet_name: currentWallet?.wallet_name,
      },
    });
  };

  const handleEnd = () => {
    console.log("hi end");
  };

  const handleDelete = () => {
    setType("delete");
    setIsOpen(true);
    setBudgetDatas({
      id: budget._id,
      process: deleteMutation,
      wallet: {
        id: budget.wallet_id,
        wallet_name: currentWallet?.wallet_name,
      },
    });
  };
  return (
    <Suspense fallback={<BudgetLoading />}>
      <div className="w-full flex flex-col items-center py-[55px] px-1 gap-y-2">
        <BudgetHeader handleEditBudget={handleEdit} />
        <BudgetDetails
          budget={budget}
          isLoading={isBudgetLoading}
          wallet={currentWallet || ({} as WalletType)}
          handleEndBudget={handleEnd}
          handleDeleteBudget={handleDelete}
        />
        <BudgetBody
          budget={budget}
          relatedTransactions={relatedTransactions}
          topUsageTransactions={topUsageTransactions}
          isBudgetLoading={isBudgetLoading}
          isRelatedTransactionsLoading={isRelatedTransactionsLoading}
          isTopUsageTransactionsLoading={isTopUsageTransactionsLoading}
        />
        <BudgetFooter
          limit={limit}
          setLimit={setLimit}
          transactions={relatedTransactions}
          isBudgetLoading={isBudgetLoading}
          isTransactionsLoading={isRelatedTransactionsLoading}
        />
      </div>
    </Suspense>
  );
};
export default Budget;

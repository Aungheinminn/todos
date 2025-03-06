"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import wallet from "@/assets/wallet_2.svg";
import caretDown from "@/assets/caret_down.svg";
import { Suspense } from "react";
import TransactionLoading from "./loading";
import { useCurrentUserStore } from "@/lib/userStore";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getTransactionsByDate } from "@/lib/transaction.service";
import TransactionMonthPicker from "@/components/TransactionMonthPicker/TransactionMonthPicker";
import TransactionsComponent from "@/components/Transactions/Transactions";
import { WalletType } from "@/lib/types/wallet.type";
import { getCurrentWallet } from "@/lib/wallet.service";
import TransactionsLoading from "@/components/TransactionsLoading/TransactionsLoading";
import { ScrollArea } from "@/components/ui/scroll-area";

type TransactionHeaderProps = {
  currentWallet: WalletType;
};

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  currentWallet,
}) => {
  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-1 p-2">
      <p className="text-sm">Balance</p>
      <p>K {currentWallet ? currentWallet?.balance : "**********"}</p>
      <Button className="w-[100px] flex items-center justify-center gap-x-2">
        <Image className="w-6 h-6" src={wallet} alt="transaction wallet" />
        <p>Total</p>
        <Image className="w-4" src={caretDown} alt="caret down" />
      </Button>
    </div>
  );
};

const Transactions = () => {
  const { currentUser } = useCurrentUserStore((state) => state);
  const [limit, setLimit] = useState<number>(10);

  const { data: currentWallet } = useQuery({
    queryKey: ["currentWallet"],
    queryFn: () => getCurrentWallet(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

  const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ["transactions", date, currentWallet, limit],
    queryFn: () =>
      getTransactionsByDate(currentWallet._id, date.month, date.year, limit),
    enabled: !!currentWallet,
  });

  console.log("currentWallet", currentWallet);
  console.log("transactions", transactions);
  return (
    <Suspense fallback={<TransactionLoading />}>
      <ScrollArea className="h-fit">
        <div className="w-full flex flex-col items-center justify-center px-0 mx-0 bg-gray-800 pt-[55px]">
          <TransactionHeader currentWallet={currentWallet} />
          <TransactionMonthPicker date={date} setDate={setDate} />
        </div>
        {isTransactionsLoading ? (
          <TransactionsLoading />
        ) : (
          transactions && (
            <TransactionsComponent
              limit={limit}
              setLimit={setLimit}
              transactions={transactions}
            />
          )
        )}
      </ScrollArea>
    </Suspense>
  );
};

export default Transactions;

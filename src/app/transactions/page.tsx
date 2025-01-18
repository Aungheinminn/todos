"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import wallet from "@/assets/wallet_2.svg";
import caretDown from "@/assets/caret_down.svg";
import { Suspense } from "react";
import TransactionLoading from "./loading";
import { useCurrentUserStore } from "@/lib/userStore";
import { useWalletStore } from "@/lib/walletStore";
import { useQuery } from "react-query";
import { getTransactionsByDate } from "@/lib/transaction.service";
import TransactionMonthPicker from "@/components/TransactionMonthPicker/TransactionMonthPicker";
import TransactionsComponent from "@/components/Transactions/Transactions";

const TransactionHeader = () => {
  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-1 p-2 ">
      <p className="text-sm">Balance</p>
      <p>K 100,000.00</p>
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
  const { currentWallet } = useWalletStore((state) => state);
  const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions", date],
    queryFn: () =>
      getTransactionsByDate(currentWallet?._id || "", date.month, date.year),
    enabled: !!currentWallet?._id || !!currentUser?._id,
  });

  console.log(transactions);

  return (
    <Suspense fallback={<TransactionLoading />}>
      <div className="h-fit">
        <div className="w-full flex flex-col items-center justify-center px-0 mx-0 bg-gray-800 pt-[55px]">
          <TransactionHeader />
          <TransactionMonthPicker date={date} setDate={setDate} />
        </div>

        <TransactionsComponent transactions={transactions} />
      </div>
    </Suspense>
  );
};

export default Transactions;

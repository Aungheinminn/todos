import { Button } from "@/components/ui/button";
import Image from "next/image";
import wallet from "@/assets/wallet_1.svg";
import caretDown from "@/assets/caret_down.svg";
import { Suspense } from "react";
import TransactionGroup from "@/components/TransactionsGroup/TransactionGroup";
import TransactionLoading from "./loading";

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
  return (
    <Suspense fallback={<TransactionLoading />}>
      <div className="w-full px-0 mx-0 bg-gray-800 pt-[55px]">
        <TransactionHeader />
        <div className="w-full flex justify-center items-center">
          <TransactionGroup />
        </div>
      </div>
    </Suspense>
  );
};

export default Transactions;

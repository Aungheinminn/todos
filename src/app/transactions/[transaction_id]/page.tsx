"use client";
import { Suspense } from "react";
import TransactionsLoading from "../loading";
import { useParams } from "next/navigation";
import Image from "next/image";
import chevronLeft from "@/assets/chevron_left.svg";
import { Categories } from "@/constants/categories";
import calendarIcon from "@/assets/calendar.svg";
import walletIcon from "@/assets/wallet.svg";
import { TransactionType } from "@/lib/types/transaction.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TransactionHeaderProps = {
  handleEdit: () => void;
};

type TransactionBodyProps = {
  transaction: TransactionType;
};

type TransactionFooterProps = {
  handleDuplicate: () => void;
  handleDelete: () => void;
};

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  handleEdit,
}) => {
  return (
    <div className="w-full flex justify-between items-center px-2 py-2 mb-2 border-t border-slate-400">
      <Link href={"/transactions"} className="flex justify-start items-center">
        <Image className="h-4 w-4" src={chevronLeft} alt="chevron left" />
        <p className="text-base font-normal">Transaction</p>
      </Link>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

const TransactionBody: React.FC<TransactionBodyProps> = ({ transaction }) => {
  return (
    <div className="w-full bg-gray-700 py-4">
      <div className="w-full flex justify-start items-start gap-x-4">
        <Image
          className="w-10 h-10 ml-2"
          src={Categories[0].icon}
          alt="transportation"
        />
        <div className="w-full flex flex-col gap-y-4 items-start pb-3 border-b border-slate-400">
          <p className="text-lg text-white">Transportation</p>
          <p className="text-lg text-red-500">100,000.00</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-y-1 px-4 pt-4">
        <div className="w-full flex justify-start items-center gap-x-4">
          <Image className="h-5 w-5" src={calendarIcon} alt="calender" />
          <p className="text-sm text-white">2023-01-01</p>
        </div>

        <div className="w-full flex justify-start items-center gap-x-4">
          <Image className="h-5 w-5" src={walletIcon} alt="calender" />
          <p className="text-sm text-white">wallet</p>
        </div>
      </div>
    </div>
  );
};

const TransactionFooter: React.FC<TransactionFooterProps> = ({
  handleDuplicate,
  handleDelete,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-gray-700">
      <Button className="w-full p-0 rounded-none bg-gray-700 hover:bg-gray-700 py-2 text-green-500 border-t border-slate-500" onClick={handleDuplicate}>Duplicate</Button>
      <Button className="w-full p-0 rounded-none bg-gray-700 hover:bg-gray-700 py-2 text-red-500 border-y border-slate-500" onClick={handleDelete}>Delete</Button>
    </div>
  );
};

const Transaction = () => {
  const router = useParams();

  const handleEdit = () => {
    console.log(router);
  };

  const handleDuplicate = () => {
    console.log(router);
  };

  const handleDelete = () => {
    console.log(router);
  };
  return (
    <Suspense fallback={<TransactionsLoading />}>
      <div className="w-full pt-[56px] mb-4">
        <TransactionHeader handleEdit={handleEdit} />
        <TransactionBody transaction={{} as TransactionType} />
      </div>
      <TransactionFooter
        handleDuplicate={handleDuplicate}
        handleDelete={handleDelete}
      />
    </Suspense>
  );
};

export default Transaction;

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
import { useQuery } from "@tanstack/react-query";
import { getTransactionById } from "@/lib/services/transaction.service";
import { useWalletStore } from "@/lib/stores/walletStore";
import { getWalletById } from "@/lib/services/wallet.service";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import { WalletWithUserInfoType } from "@/lib/types/wallet.type";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactionPopupStore } from "@/lib/stores/transactionPopupStore";
import { useTransactionMutation } from "@/lib/mutations/transactionMutation";
import { isAdmin } from "@/lib/utils/isAdmin";

type TransactionHeaderProps = {
  handleEdit: () => void;
};

type TransactionBodyProps = {
  wallet: WalletWithUserInfoType;
  transaction: TransactionType;
  isLoading: boolean;
};

type TransactionFooterProps = {
  isAdmin: boolean;
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

const TransactionBody: React.FC<TransactionBodyProps> = ({
  wallet,
  transaction,
  isLoading,
}) => {
  const date = transaction && new Date(transaction.created_at);
  return (
    <div className="w-full flex justify-center items-center bg-gray-700 py-4">
      {isLoading || !wallet || !transaction ? (
        <Skeleton className="w-[98%] h-[150px] bg-slate-500 rounded-lg" />
      ) : (
        <div className="w-full">
          <div className="w-full flex justify-start items-start gap-x-4">
            <Image
              className="w-10 h-10 ml-2"
              src={
                Categories.find((cate) => cate.name === transaction.category)
                  ?.icon
              }
              alt="transportation"
            />
            <div className="w-full flex flex-col gap-y-4 items-start pb-3 border-b border-slate-400">
              <div className="flex flex-col items-start gap-y-1">
                <p className="text-lg text-white">{transaction.category}</p>
                <p className="text-xs text-white">{transaction.note || ""}</p>
              </div>
              <p className="text-lg text-red-500">{transaction.transaction}</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-y-1 px-4 pt-4">
            <div className="w-full flex justify-start items-center gap-x-4">
              <Image className="h-5 w-5" src={calendarIcon} alt="calender" />
              <p className="text-sm text-white">
                {date.toString().split(" ").slice(0, 1).join(" ")},{" "}
                {date.toString().split(" ").slice(1, 4).join(" ")}
              </p>
            </div>

            <div className="w-full flex justify-start items-center gap-x-4">
              <Image className="h-5 w-5" src={walletIcon} alt="calender" />
              <p className="text-sm text-white">{wallet.wallet_name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TransactionFooter: React.FC<TransactionFooterProps> = ({
  isAdmin,
  handleDuplicate,
  handleDelete,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-gray-700">
      <Button
        className="w-full p-0 rounded-none bg-gray-700 hover:bg-gray-700 py-2 text-green-500 border-t border-slate-500"
        disabled={!isAdmin}
        onClick={handleDuplicate}
      >
        Duplicate
      </Button>
      <Button
        className="w-full p-0 rounded-none bg-gray-700 hover:bg-gray-700 py-2 text-red-500 border-y border-slate-500"
        disabled={!isAdmin}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
};

const Transaction = () => {
  const router = useParams();
  const { transaction_id } = router;
  const { currentUser } = useCurrentUserStore((state) => state);
  const { currentWallet } = useWalletStore((state) => state);
  const { editMutation, deleteMutation, duplicateMutation } =
    useTransactionMutation();

  const { setIsOpen, setType, setTransactionDatas } = useTransactionPopupStore(
    (state) => state,
  );
  const { data: transaction, isLoading: isTransactionLoading } = useQuery({
    queryKey: ["transaction", editMutation.isSuccess],
    queryFn: () => getTransactionById(transaction_id.toString() || ""),
    enabled: !!currentWallet?._id,
  });

  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWalletById(transaction.wallet_id || ""),
    enabled: !!transaction,
  });

  const handleEdit = () => {
    setType("edit");
    setIsOpen(true);
    setTransactionDatas({
      _id: transaction._id,
      amount: transaction.transaction,
      category: {
        id: transaction.category_id,
        name: transaction.category,
        icon: Categories.find((cate) => cate.name === transaction.category)
          ?.icon,
      },
      note: transaction.note,
      date: new Date(transaction.created_at),
      wallet: {
        id: transaction.wallet_id,
        wallet_name: wallet.wallet_name,
      },
      process: editMutation,
    });
  };

  const handleDuplicate = () => {
    setType("duplicate");
    setIsOpen(true);
    setTransactionDatas({
      _id: transaction._id,
      amount: transaction.transaction,
      category: {
        id: transaction.category_id,
        name: transaction.category,
        icon: Categories.find((cate) => cate.name === transaction.category)
          ?.icon,
      },
      note: transaction.note,
      date: new Date(transaction.created_at),
      wallet: {
        id: transaction.wallet_id,
        wallet_name: wallet.wallet_name,
      },
      process: duplicateMutation,
    });
  };

  const handleDelete = () => {
    setType("delete");
    setIsOpen(true);
    setTransactionDatas({
      _id: transaction._id,
      wallet: {
        id: transaction.wallet_id,
        wallet_name: wallet.wallet_name || "",
      },
      category: {
        id: transaction.category_id,
        name: transaction.category,
        icon: Categories.find((cate) => cate.name === transaction.category)
          ?.icon,
      },

      process: deleteMutation,
    });
  };

  console.log(transaction, wallet, currentUser);

  return (
    <Suspense fallback={<TransactionsLoading />}>
      <div className="w-full pt-[56px] mb-4">
        <TransactionHeader handleEdit={handleEdit} />
        <TransactionBody
          wallet={wallet}
          transaction={transaction}
          isLoading={isTransactionLoading}
        />
      </div>
      <TransactionFooter
        isAdmin={isAdmin(
          currentUser?._id || "",
          transaction?.user_id || "",
          wallet?.user._id || "",
        )} // This is needed because of the shared wallet side effect as other user can delete yours if this is not applied
        handleDuplicate={handleDuplicate}
        handleDelete={handleDelete}
      />
    </Suspense>
  );
};

export default Transaction;

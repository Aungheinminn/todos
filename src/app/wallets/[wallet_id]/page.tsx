"use client";

import WalletLoading from "@/app/wallets/[wallet_id]/loading";
import { WalletType } from "@/lib/types/wallet.type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import dateIcon from "@/assets/date.svg";
import moneyIcon from "@/assets/money.svg";
import deleteIcon from "@/assets/trash.svg";
import shareIcon from "@/assets/share.svg";
import transactionIcon from "@/assets/transaction_page_indicator_icon.svg";
import AddSharedWalletUsers from "@/components/AddSharedWalletUsers/AddSharedWalletUsers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type WalletHeaderProps = {
  wallet: WalletType;
  handleViewTransactions: () => void;
};

type WalletActionsProps = {
  wallet: WalletType;
  handleDelete: () => void;
};

const WalletHeader: React.FC<WalletHeaderProps> = ({ wallet, handleViewTransactions }) => {
  return (
    <div className="flex flex-col gap-3 px-1">
      <div className="w-full">
        <div className="bg-gray-700 rounded-lg p-4 sm:p-6 shadow-lg border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                {wallet.wallet_name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Owner: {wallet.user_id}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-gray-400 mb-1">
                Available Balance
              </p>
              <div className="flex items-baseline flex-wrap gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {wallet.balance}
                </span>
              </div>
            </div>
            {wallet.current && (
              <span className="self-start px-3 py-1 bg-green-900/30 text-green-400 text-xs sm:text-sm rounded-full font-medium">
                Current
              </span>
            )}
          </div>
          <div className="w-full flex justify-end items-center">
            <Button
              onClick={handleViewTransactions}
              className="w-fit px-4 py-2.5 text-sm font-medium text-white bg-blue-700/50 hover:bg-blue-600 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Image
                className="w-4 h-4"
                src={transactionIcon}
                alt="transactions"
              />
              View Transactions
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <Image className="w-4 h-4" src={dateIcon} alt="date" />
            <p className="text-xs text-gray-400">Created On</p>
          </div>
          <p className="text-sm text-white font-medium">
            {wallet.created_at &&
              new Date(wallet.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <Image className="w-4 h-4" src={moneyIcon} alt="money" />
            <p className="text-xs text-gray-400">Currency</p>
          </div>
          <p className="text-sm text-white font-medium">{wallet.currency}</p>
        </div>
      </div>
    </div>
  );
};

const WalletActions: React.FC<WalletActionsProps> = ({
  wallet,
  handleDelete,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-1 px-1">
      <button
        onClick={handleDelete}
        className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-700/50 hover:bg-red-600 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Image className="w-4 h-4" src={deleteIcon} alt="delete" />
        Delete
      </button>
      {wallet.shared_user_ids && wallet.shared_user_ids.length > 0 && (
        <AddSharedWalletUsers wallet={wallet}>
          <Image className="w-4 h-4" src={shareIcon} alt="share" />
          Share
        </AddSharedWalletUsers>
      )}
    </div>
  );
};

const Wallet = () => {
  const router = useParams();

  console.log("router", router);

  const mockWallet = {
    _id: "1",
    wallet_name: "Wallet 1",
    user_id: "1af",
    created_at: new Date(),
    currency: "MMK",
    balance: 1000,
    current: true,
    shared_user_ids: ["1", "2", "3"],
  };

  const handleViewTransactions = () => {
    
  }
  const handleDelete = () => {};

  return (
    <Suspense fallback={<WalletLoading />}>
      <div className="w-full flex flex-col gap-y-4 pt-[55px] mb-4">
        <WalletHeader wallet={mockWallet} handleViewTransactions={handleViewTransactions} />
        <WalletActions
          wallet={mockWallet}
          handleDelete={handleDelete}
        />
      </div>
    </Suspense>
  );
};

export default Wallet;

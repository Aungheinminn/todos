"use client";

import WalletLoading from "@/app/wallets/[wallet_id]/loading";
import { WalletType, WalletWithUserInfoType } from "@/lib/types/wallet.type";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import dateIcon from "@/assets/date.svg";
import moneyIcon from "@/assets/money.svg";
import deleteIcon from "@/assets/trash.svg";
import shareIcon from "@/assets/share.svg";
import transactionIcon from "@/assets/transaction_page_indicator_icon.svg";
import AddSharedWalletUsers from "@/components/AddSharedWalletUsers/AddSharedWalletUsers";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/lib/stores/walletStore";
import { useWalletMutation } from "@/lib/mutations/walletMutation";
import { useQuery } from "@tanstack/react-query";
import { getWalletById } from "@/lib/services/wallet.service";
import { Skeleton } from "@/components/ui/skeleton";
import MutateLoading from "@/components/MutateLoading/MutateLoading";
import { getSharedWalletUsers } from "@/lib/services/sharedWallet.service";
import WalletUserManagement from "@/components/WalletUserManagement/WalletUserManagement";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCurrentUserStore } from "@/lib/stores/userStore";

type WalletHeaderProps = {
  wallet: WalletWithUserInfoType;
  isViewTransactionsLoading: boolean;
  handleViewTransactions: () => void;
};

type WalletActionsProps = {
  isAdmin: boolean;
  wallet: WalletWithUserInfoType;
  handleDelete: () => void;
};

const WalletHeader: React.FC<WalletHeaderProps> = ({
  wallet,
  isViewTransactionsLoading,
  handleViewTransactions,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full">
        <div className="bg-gray-700 rounded-lg p-4 sm:p-6 shadow-lg border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                {wallet.wallet_name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Owner: {wallet.user.username || wallet.user.email}
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
              disabled={isViewTransactionsLoading}
              className="w-fit px-4 py-2.5 text-sm font-medium text-white bg-blue-700/50 hover:bg-blue-600 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isViewTransactionsLoading ? (
                <MutateLoading width="144px" height="40px" />
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    className="w-4 h-4"
                    src={transactionIcon}
                    alt="transactions"
                  />
                  View Transactions
                </div>
              )}
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
  isAdmin,
  wallet,
  handleDelete,
}) => {
  console.log(wallet.shared_user_ids, isAdmin);
  return (
    <div
      className={`flex flex-col sm:flex-row gap-1 ${isAdmin ? "" : "hidden"}`}
    >
      <button
        onClick={handleDelete}
        className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-700/50 hover:bg-red-600 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Image className="w-4 h-4" src={deleteIcon} alt="delete" />
        Delete
      </button>
      {wallet &&
        wallet.shared_user_ids &&
        wallet.shared_user_ids.length !== 0 && (
          <AddSharedWalletUsers wallet={wallet}>
            <Image className="w-4 h-4" src={shareIcon} alt="share" />
            Share
          </AddSharedWalletUsers>
        )}
    </div>
  );
};

const Wallet = () => {
  const param = useParams();
  const router = useRouter();
  const { updateCurrentWallet } = useWalletStore((state) => state);
  const { currentUser } = useCurrentUserStore((state) => state);
  const { updateCurrentWalletMutation } = useWalletMutation();

  const [search, setSearch] = useState<string>("");

  console.log(search);

  const { data: wallet, isLoading } = useQuery({
    queryKey: ["wallet", param.wallet_id],
    queryFn: () => getWalletById(param.wallet_id.toString() || ""),
    enabled: !!param.wallet_id,
  });

  const { data: sharedWalletUsers, isLoading: isSharedWalletUsersLoading } =
    useQuery({
      queryKey: ["sharedWalletUsers"],
      queryFn: () => getSharedWalletUsers(wallet._id),
      enabled:
        wallet && wallet.shared_user_ids && wallet.shared_user_ids.length > 0,
    });

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleViewTransactions = () => {
    if (wallet.current) {
      router.push(`/transactions`);
    } else {
      updateCurrentWalletMutation.mutate(
        { wallet_id: wallet._id || "", user_id: wallet.user_id },
        {
          onSuccess: (data) => {
            if (data.success) {
              updateCurrentWallet(data.data);
              router.push(`/transactions`);
            }
          },
        },
      );
    }
  };
  const handleDelete = () => {};

  const handleMakeAdmin = () => {};

  const handleLeaveWallet = () => {};

  const handleRemoveUser = () => {};

  if (isLoading) {
    return (
      <div className="flex pt-[55px] flex-col gap-y-3 w-full px-1">
        <Skeleton className="w-full h-[202px] bg-gray-700 rounded-lg" />
        <Skeleton className="w-full h-[76px] bg-gray-700 rounded-lg" />
        <Skeleton className="w-full h-[90px] bg-gray-700 rounded-lg" />
      </div>
    );
  }

  return (
    <Suspense fallback={<WalletLoading />}>
      <ScrollArea className="w-full h-[calc(100vh-56px)] ">
        <div className="h-full flex flex-col justify-start gap-y-4 pt-[55px] px-1 mb-4">
          <ScrollBar className="z-[100]" />
          <WalletHeader
            wallet={wallet}
            isViewTransactionsLoading={updateCurrentWalletMutation.isPending}
            handleViewTransactions={handleViewTransactions}
          />
          <WalletUserManagement
            currentUserId={currentUser?._id || ""}
            walletAdminId={wallet.user._id}
            users={sharedWalletUsers || []}
            onSearch={handleSearch}
            onMakeAdmin={handleMakeAdmin}
            onLeaveWallet={handleLeaveWallet}
            onRemoveUser={handleRemoveUser}
            isLoading={isSharedWalletUsersLoading}
            totalUsers={sharedWalletUsers?.length || 0}
          />
          <WalletActions
            isAdmin={currentUser?._id === wallet.user._id}
            wallet={wallet}
            handleDelete={handleDelete}
          />
        </div>
      </ScrollArea>
    </Suspense>
  );
};

export default Wallet;

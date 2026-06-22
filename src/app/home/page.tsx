"use client";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import { getCurrentUser } from "@/lib/services/users.service";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import "react-day-picker/dist/style.css";
import HomeLoading from "./loading";
import TotalWallets from "@/components/TotalWallets/TotalWallets";
import { getCurrentWallet, getWallets } from "@/lib/services/wallet.service";
import Balance from "@/components/Balance/Balance";
import { useWalletStore } from "@/lib/stores/walletStore";
import Link from "next/link";
import RecentTransactions from "@/components/RecentTransactions/RecentTransactions";
import BudgetOverviewWidget from "@/components/BudgetOverviewWidget/BudgetOverviewWidget";
import { getBudgetSpentOverview } from "@/lib/services/budget.service";
import { getRecentTransactions } from "@/lib/services/transaction.service";

const Home = () => {
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );

  const { currentWallet, updateCurrentWallet } = useWalletStore(
    (state) => state,
  );

  const { data: currentUserQuery } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
  });

  const { data: currentWalletQuery, isLoading: isCurrentWalletLoading } =
    useQuery({
      queryKey: ["currentWallet"],
      queryFn: () => getCurrentWallet(currentUser?._id || ""),
      enabled: !!currentUser?._id,
    });

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWallets(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

  const { data: recentTransactions } = useQuery({
    queryKey: ["recentTransactions"],
    queryFn: () => getRecentTransactions(currentWallet?._id || ""),
    enabled: !!currentUser?._id && !!currentWallet?._id,
  })

  const { data: budgetOverview } = useQuery({
    queryKey: ["budgetOverview"],
    queryFn: () => getBudgetSpentOverview(currentWallet?._id || ""),
    enabled: !!currentUser?._id && !!currentWallet?._id,
  });

  useEffect(() => {
    if (currentUserQuery) {
      updateCurrentUser(currentUserQuery.data.currentUser);
    }
    if (currentWalletQuery) {
      updateCurrentWallet(currentWalletQuery);
    }
  }, [currentUserQuery, currentWalletQuery]);

  return (
    <Suspense fallback={<HomeLoading />}>
      <div className="w-full pt-[55px] text-black flex items-center flex-col justify-center">
        <Balance
          currentWallet={currentWallet}
          isLoading={isCurrentWalletLoading}
        />

        <div className="mt-2" />
        <TotalWallets wallets={wallets} />

        <div className="mt-4 w-full px-4">
          <RecentTransactions recentTransactions={recentTransactions} />
        </div>

        <div className="mt-4 w-full px-4">
          <BudgetOverviewWidget budgetOverview={budgetOverview} />
        </div>
      </div>
    </Suspense>
  );
};
export default Home;

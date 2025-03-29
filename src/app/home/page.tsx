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

  console.log("currentUserQuery", currentUserQuery);

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

  useEffect(() => {
    console.log("currentWalletQuery", currentWalletQuery);
    if (currentUserQuery) {
      updateCurrentUser(currentUserQuery.data.currentUser);
    }
    if (currentWalletQuery) {
      updateCurrentWallet(currentWalletQuery);
    }
  }, [currentUserQuery, currentWalletQuery]);

  console.log("wallets", wallets);
  console.log("currentUser", currentUser);
  console.log("currentWallet", currentWallet);
  return (
    <Suspense fallback={<HomeLoading />}>
      <div className="w-full pt-[55px] text-black flex items-center flex-col justify-center">
        <Balance
          currentWallet={currentWallet}
          isLoading={isCurrentWalletLoading}
        />

        <div className="mt-2" />
        <TotalWallets wallets={wallets} />
        <Link href='/shared-wallet-infos'>Shared Wallet Invitations</Link>
      </div>
    </Suspense>
  );
};
export default Home;

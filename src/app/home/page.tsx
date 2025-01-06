"use client";
import { useCurrentUserStore } from "@/lib/userStore";
import { getCurrentUser } from "@/lib/users.service";
import { useQuery } from "react-query";
import { Suspense } from "react";
import "react-day-picker/dist/style.css";
import HomeLoading from "./loading";
import TotalWallets from "@/components/TotalWallets/TotalWallets";
import { getCurrentWallet, getWallets } from "@/lib/wallet.service";
import Balance from "@/components/Balance/Balance";
import { useWalletStore } from "@/lib/walletStore";

const Home = () => {
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );

  const { currentWallet, updateCurrentWallet } = useWalletStore(
    (state) => state,
  );

  useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });

  const { isLoading: isCurrentWalletLoading } = useQuery({
    queryKey: ["currentWallet"],
    queryFn: () => getCurrentWallet(currentUser?._id || ""),
    enabled: !!currentUser?._id,
    onSuccess: (data) => {
      updateCurrentWallet(data);
    },
  });

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWallets(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

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
      </div>
    </Suspense>
  );
};
export default Home;

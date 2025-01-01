"use client";
import { useCurrentUserStore } from "@/lib/userStore";
import { getCurrentUser } from "@/lib/users.service";
import { useQuery } from "react-query";
import { Suspense } from "react";
import "react-day-picker/dist/style.css";
import HomeLoading from "./loading";
import AddWallet from "@/components/AddWallet/AddWallet";
import { useWalletStore } from "@/lib/walletStore";
import TotalWallets from "@/components/TotalWallets/TotalWallets";
import { getWallets } from "@/lib/wallet.service";

const Home = () => {
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );

  useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWallets(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

  console.log("wallets", wallets);
  console.log("currentUser", currentUser);
  return (
    <Suspense fallback={<HomeLoading />}>
      <div className="w-full pt-[55px] text-black flex items-center flex-col justify-center">
        <div className="mt-2" />
        <TotalWallets wallets={wallets} />
      </div>
    </Suspense>
  );
};
export default Home;

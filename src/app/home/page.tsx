"use client";
import { Suspense } from "react";
import "react-day-picker/dist/style.css";
import HomeLoading from "./loading";
import AddWallet from "@/components/AddWallet/AddWallet";
import { useWalletStore } from "@/lib/walletStore";
import TotalWallets from "@/components/TotalWallets/TotalWallets";

const Home = () => {
  return (
    <Suspense fallback={<HomeLoading />}>
      <div className="w-full pt-[55px] text-black flex items-center flex-col justify-center">
        <div className="mt-2" />
        <TotalWallets />
      </div>
    </Suspense>
  );
};
export default Home;

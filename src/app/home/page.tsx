"use client";
import { Suspense } from "react";
import "react-day-picker/dist/style.css";
import HomeLoading from "./loading";
import AddWallet from "@/components/AddWallet/AddWallet";
import { useWalletStore } from "@/lib/walletStore";

const Home = () => {
  const { isOpen: walletOpen, setIsOpen: setWalletOpen } = useWalletStore(
    (state) => state,
  );
  return (
    <Suspense fallback={<HomeLoading />}>
      <div className="w-full pt-[55px] text-black flex items-center flex-col justify-center">
        <div className="mt-1" />
        <AddWallet open={walletOpen} setOpen={setWalletOpen} />
      </div>
    </Suspense>
  );
};
export default Home;

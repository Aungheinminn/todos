"use client";
import { useState } from "react";
import Image from "next/image";
import eye from "@/assets/eye.svg";
import eyeHide from "@/assets/eye_hide.svg";
import { WalletType } from "@/lib/types/wallet.type";

type BalanceProps = {
  currentWallet: WalletType | null;
  isLoading: boolean;
};

const Balance: React.FC<BalanceProps> = ({ currentWallet, isLoading }) => {
  const [hide, setHide] = useState<boolean>(false);
  const balance = "K " + currentWallet?.balance || "0";

  return (
    <div className="w-full bg-gray-800 justify-start items-center px-2 py-3 rounded-b-xl">
      <div className="flex flex-col ">
        <div className="flex justify-start items-center gap-x-2">
          <p className="text-xl text-white font-normal">
            {hide || isLoading ? "**********" : currentWallet ? balance : "**********"}
          </p>
          <div onClick={() => setHide(!hide)}>
            {hide ? (
              <Image
                className="w-6 h-6 cursor-pointer"
                src={eyeHide}
                alt="eye hide"
              />
            ) : (
              <Image className="w-6 h-6 cursor-pointer" src={eye} alt="eye" />
            )}
          </div>
        </div>
        <p className="text-sm text-slate-500">Total Balance</p>
      </div>
    </div>
  );
};

export default Balance;

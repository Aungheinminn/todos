"use client";
import { useCurrentUserStore } from "@/lib/userStore";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import InitialAmountInput from "../InitialAmountInput/InitialAmountInput";
import WalletInput from "../WalletInput/WalletInput";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../ui/drawer";
import { useState } from "react";
import Image from "next/image";
import add from "@/assets/add_wallet.svg";
import { useWalletMutation } from "@/lib/walletMutation";

type AddWalletProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddWallet: React.FC<AddWalletProps> = ({ open, setOpen }) => {
  const [wallet, setWallet] = useState<string>("");
  const [currency, setCurrency] = useState<string>("MMK");
  const [initialAmount, setInitialAmount] = useState<number | string>("");
  const { currentUser } = useCurrentUserStore((state) => state);
  const { createMutation } = useWalletMutation();

  const handleCreateWallet = () => {
    const newWallet = {
      wallet_name: wallet,
      user_id: currentUser?._id || "",
      currency: currency,
      balance: initialAmount,
      current: false,
    };

    try {
      createMutation.mutate(newWallet, {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error: any) => {
          console.log(error);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full flex justify-start items-center p-3 gap-x-3">
        <Image className="w-5 h-5" src={add} alt="add wallet" />
        <p className="text-sm text-green-300">Add wallet</p>
      </DrawerTrigger>
      <DrawerContent className="pointer-events-auto flex flex-col items-center gap-y-4 bg-gray-800">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose onClick={() => setOpen(false)} className="">
            Cancel
          </DrawerClose>
          <DrawerTitle className="font-medium">Add wallet</DrawerTitle>
          <p className="opacity-0">cancel</p>
        </DrawerHeader>
        <div className="w-full flex flex-col border-y border-y-slate-500">
          <WalletInput wallet={wallet} setWallet={setWallet} />
          <CurrencyInput currency={currency} setCurrency={setCurrency} />
          <InitialAmountInput
            initialAmount={initialAmount}
            setInitialAmount={setInitialAmount}
          />
        </div>

        <DrawerClose
          onClick={() => console.log("it works")}
          className="w-[80%] bg-gray-700 py-1 rounded-2xl hover:bg-sky-400"
        >
          Save
        </DrawerClose>
        <div></div>
      </DrawerContent>
    </Drawer>
  );
};
export default AddWallet;

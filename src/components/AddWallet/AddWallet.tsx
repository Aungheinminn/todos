"use client";
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

type AddWalletProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddWallet: React.FC<AddWalletProps> = ({ open, setOpen }) => {
  const [wallet, setWallet] = useState<string>("");
  const [currency, setCurrency] = useState<string>("MMK");
  const [initialAmount, setInitialAmount] = useState<number | string>("");
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>aaa</DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-y-4 bg-gray-800">
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

        <DrawerClose onClick={() => setOpen(false)} className="w-[80%] bg-gray-700 py-1 rounded-2xl">Save</DrawerClose>
        <div></div>
      </DrawerContent>
    </Drawer>
  );
};
export default AddWallet;

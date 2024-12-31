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
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/users.service";
import Image from "next/image";
import add from "@/assets/add_wallet.svg";

type AddWalletProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddWallet: React.FC<AddWalletProps> = ({ open, setOpen }) => {
  const [wallet, setWallet] = useState<string>("");
  const [currency, setCurrency] = useState<string>("MMK");
  const [initialAmount, setInitialAmount] = useState<number | string>("");

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

  console.log("currentUser", currentUser);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full flex justify-start items-center p-3 gap-x-3">
        <Image className="w-5 h-5" src={add} alt="add wallet" />
        <p className="text-sm text-green-300">Add wallet</p>
      </DrawerTrigger>
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

        <DrawerClose
          onClick={() => setOpen(false)}
          className="w-[80%] bg-gray-700 py-1 rounded-2xl"
        >
          Save
        </DrawerClose>
        <div></div>
      </DrawerContent>
    </Drawer>
  );
};
export default AddWallet;

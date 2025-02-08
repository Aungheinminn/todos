"use client";
import { useCurrentUserStore } from "@/lib/userStore";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import InitialAmountInput from "../InitialAmountInput/InitialAmountInput";
import WalletInput from "../WalletInput/WalletInput";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../ui/drawer";
import { useEffect, useState } from "react";
import { useWalletMutation } from "@/lib/walletMutation";
import { useWalletPopupStore } from "@/lib/walletPopupStore";
import { Button } from "../ui/button";

const ConfirmWalletPopup = () => {
  const { currentUser } = useCurrentUserStore((state) => state);
  const {
    isOpen: open,
    setIsOpen: setOpen,
    walletDatas,
    type,
    resetWalletDatas,
  } = useWalletPopupStore((state) => state);
  const [wallet, setWallet] = useState<string>("");
  const [currency, setCurrency] = useState<string>("MMK");
  const [initialAmount, setInitialAmount] = useState<number | string>("");
  const { createMutation, editMutation } = useWalletMutation();

  const handleCreateWallet = () => {
    let newWallet;
    if (type === "create") {
      newWallet = {
        wallet_name: wallet,
        user_id: currentUser?._id || "",
        currency: currency,
        balance: Number(initialAmount),
        current: false,
      };
      walletDatas.process = createMutation;
    } else if (type === "edit") {
      newWallet = {
        _id: walletDatas?._id || "",
        wallet_name: wallet,
        user_id: walletDatas?.user_id || "",
        created_at: walletDatas?.created_at
          ? new Date(walletDatas?.created_at)
          : new Date(),
        currency: currency,
        balance: Number(initialAmount),
        current: walletDatas?.current,
      };
      walletDatas.process = editMutation;
    }

    try {
      walletDatas.process.mutate(newWallet, {
        onSuccess: (data: any) => {
          console.log("after data", data);
          if (data.success) {
            setOpen(false);
            resetWalletDatas();
          }
        },
        onError: (error: any) => {
          console.log(error);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!walletDatas) return;
    setWallet(walletDatas.wallet_name);
    setCurrency(walletDatas.currency || "MMK");
    setInitialAmount(walletDatas.balance);
  }, [walletDatas]);
  return (
    <Drawer
      open={(type === "create" || type === "edit") && open}
      onOpenChange={setOpen}
    >
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

        <Button
          disabled={!wallet || !initialAmount}
          onClick={handleCreateWallet}
          className="w-[80%] bg-gray-700 py-1 rounded-2xl hover:bg-sky-400"
        >
          Save
        </Button>
        <DrawerClose className="hidden"></DrawerClose>
        <div></div>
      </DrawerContent>
    </Drawer>
  );
};
export default ConfirmWalletPopup;

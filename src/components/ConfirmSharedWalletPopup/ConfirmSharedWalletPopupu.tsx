"use client";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import InitialAmountInput from "../InitialAmountInput/InitialAmountInput";
import WalletInput from "../WalletInput/WalletInput";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerDescription,
} from "../ui/drawer";
import { useEffect, useState } from "react";
import { useWalletMutation } from "@/lib/mutations/walletMutation";
import { Button } from "../ui/button";
import { useSharedWalletPopupStore } from "@/lib/stores/sharedWalletPopupStore";
import { useSharedWalletMutation } from "@/lib/mutations/sharedWalletMutation";

const ConfirmSharedWalletPopup = () => {
  const { currentUser } = useCurrentUserStore((state) => state);
  const {
    isOpen: open,
    setIsOpen: setOpen,
    walletDatas,
    type,
    resetWalletDatas,
  } = useSharedWalletPopupStore((state) => state);
  const [wallet, setWallet] = useState<string>("");
  const [currency, setCurrency] = useState<string>("MMK");
  const [initialAmount, setInitialAmount] = useState<number | string>("");
  const { createMutation } = useSharedWalletMutation();

  const handleCreateWallet = () => {
    const newWallet = {
      ...(type === "edit" && {
        _id: walletDatas?._id || "",
        created_at: walletDatas?.created_at
          ? new Date(walletDatas?.created_at)
          : new Date(),
      }),
      wallet_name: type === "create" ? wallet : walletDatas?.wallet_name,
      user_id: type === "create" ? currentUser?._id : walletDatas?.user_id,
      balance: Number(initialAmount),
      currency: currency,
      current: type === "create" ? false : walletDatas?.current,
    };
    walletDatas.process = type === "create" ? createMutation : () => {};

    try {
      walletDatas.process.mutate(newWallet, {
        onSuccess: (data: any) => {
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
          <DrawerTitle className="font-medium">Add Shared Wallet</DrawerTitle>
          <p className="opacity-0">cancel</p>
        </DrawerHeader>
        <DrawerDescription className="hidden"></DrawerDescription>
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
export default ConfirmSharedWalletPopup;

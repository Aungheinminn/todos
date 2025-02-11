"use client";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useBudgetPopupStore } from "@/lib/budgetPopupStore";
import AmountInput from "../AmountInput/AmountInput";
import CategorySelection from "../CategorySelection/CategorySelection";
import WalletSettings from "../WalletSettings/WalletSettings";
import { Button } from "../ui/button";
import { useQuery } from "react-query";
import { getWallets } from "@/lib/wallet.service";
import { useCurrentUserStore } from "@/lib/userStore";
import WalletSelection from "../WalletSelection/WalletSelection";
import { useWalletStore } from "@/lib/walletStore";

const ConfirmBudgetPopup = () => {
  const {
    isOpen: open,
    setIsOpen: setOpen,
    budgetDatas,
    type,
    setType,
    resetBudgetDatas,
  } = useBudgetPopupStore((state) => state);

  const { currentUser } = useCurrentUserStore((state) => state);
  const { currentWallet } = useWalletStore((state) => state);

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWallets(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

  const [category, setCategory] = useState<{
    id: number;
    name: string;
    icon: string;
  }>({
    id: 0,
    name: "",
    icon: "",
  });
  const [amount, setAmount] = useState<number | string>("");
  const [range, setRange] = useState<string>("");

  const [wallet, setWallet] = useState<{
    id: string;
    wallet_name: string;
  }>({
    id: "",
    wallet_name: "",
  });

  const handleClose = () => {
    setOpen(false);
    resetBudgetDatas();
    setType("");
  };

  useEffect(() => {
    if (!budgetDatas) return;
    setCategory(budgetDatas.category);
    setAmount(budgetDatas.budget);
    setWallet({
      id: budgetDatas.wallet.id || currentWallet?._id || "",
      wallet_name:
        budgetDatas.wallet.wallet_name || currentWallet?.wallet_name || "",
    });
    setRange(budgetDatas.range);
  }, [currentWallet, budgetDatas]);

  return (
    <Drawer
      open={(type === "create" || type === "edit") && open}
      onOpenChange={setOpen}
    >
      <DrawerContent className="w-full flex flex-col items-center justify-center bg-gray-800 py-2 gap-y-4">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose onClick={handleClose} className="">
            Cancel
          </DrawerClose>
          <DrawerTitle className="font-medium">
            {type === "create" ? "Add" : "Edit"} transaction
          </DrawerTitle>
          <p className="opacity-0">cancel</p>
        </DrawerHeader>
        <div className={`w-full flex flex-col bg-gray-700 gap-y-3 py-3 `}>
          <AmountInput amount={amount} setAmount={setAmount} />
          <CategorySelection category={category} setCategory={setCategory} />
          <WalletSelection
            wallets={wallets}
            seletedWallet={wallet}
            setSeletedWallet={setWallet}
          />
        </div>
        <Button
          // disabled={!amount || !category.name || !wallet || !date}
          className="bg-gray-700 hover:bg-sky-600 w-[80%] py-2 rounded-2xl text-sm"
          // onClick={handleTransaction}
        >
          Save
        </Button>
        <div></div>
      </DrawerContent>{" "}
    </Drawer>
  );
};

export default ConfirmBudgetPopup;

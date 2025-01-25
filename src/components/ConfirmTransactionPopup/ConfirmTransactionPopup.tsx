"use client";
import { useQuery } from "react-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import AmountInput from "../AmountInput/AmountInput";
import CategorySelection from "../CategorySelection/CategorySelection";
import NoteInput from "../NoteInput/NoteInput";
import Calendar from "../Calendar/Calendar";
import WalletSelection from "../WalletSelection/WalletSelection";
import { useCurrentUserStore } from "@/lib/userStore";
import { useWalletStore } from "@/lib/walletStore";
import { getWallets } from "@/lib/wallet.service";
import { getDate } from "@/lib/utils/getDate";
import { useTransactionMutation } from "@/lib/transactionMutation";
import { Button } from "../ui/button";
import { useTransactionPopupStore } from "@/lib/transactionPopupStore";

const ConfirmTransactionPopup = () => {
  const {
    isOpen: open,
    setIsOpen: setOpen,
    type,
    transactionDatas,
    resetTransactionDatas,
  } = useTransactionPopupStore((state) => state);

  console.log(transactionDatas, "transactionDatas");
  const { currentUser } = useCurrentUserStore((state) => state);
  const { currentWallet } = useWalletStore((state) => state);
  const { createMutation } = useTransactionMutation();

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWallets(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

  const [amount, setAmount] = useState<number | string>(
    transactionDatas.amount || "",
  );
  const [category, setCategory] = useState<{
    id: number;
    name: string;
    icon: string;
  }>(
    transactionDatas.category || {
      id: 0,
      name: "",
      icon: "",
    },
  );
  const [note, setNote] = useState<string>(transactionDatas.note || "");
  const [date, setDate] = useState<Date>(transactionDatas.date || new Date());
  const [wallet, setWallet] = useState<{
    id: string;
    wallet_name: string;
  }>(
    transactionDatas.wallet || {
      id: currentWallet?._id ?? "",
      wallet_name: currentWallet?.wallet_name ?? "Add a wallet",
    },
  );

  const handleClose = () => {
    setOpen(false);
    resetTransactionDatas();
  };

  const handleTransaction = async () => {
    let data;
    if (type === "create") {
      data = {
        wallet_id: wallet.id,
        transaction: amount,
        user_id: currentUser?._id || "",
        category: category.name,
        note,
        transaction_day: getDate(date).day,
        transaction_month: getDate(date).month,
        transaction_year: getDate(date).year,
      };
      transactionDatas.process = createMutation;
    } else if (type === "edit") {
      data = {
        _id: transactionDatas?._id || "",
        wallet_id: wallet.id,
        transaction: amount,
        user_id: currentUser?._id || "",
        category: category.name,
        note,
        transaction_day: getDate(date).day,
        transaction_month: getDate(date).month,
        transaction_year: getDate(date).year,
      };
    }
    try {
      transactionDatas.process.mutate(data, {
        onSuccess: (data: any) => {
          if (data.success) {
            setOpen(false);
            resetTransactionDatas();
          } else {
            setOpen(true);
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
    if (!currentWallet || !transactionDatas) return;
    setAmount(transactionDatas.amount || "");
    setCategory({
      id: transactionDatas.category?.id || 0,
      name: transactionDatas.category?.name || "",
      icon: transactionDatas.category?.icon || "",
    });
    setNote(transactionDatas.note || "");
    setDate(transactionDatas.date || new Date());
    setWallet({
      id: transactionDatas.wallet?.id || currentWallet?._id || "",
      wallet_name:
        transactionDatas.wallet?.wallet_name ||
        currentWallet?.wallet_name ||
        "",
    });
  }, [currentWallet, transactionDatas]);

  return (
    <Drawer open={(type === "create" || type === "edit") && open} onOpenChange={setOpen}>
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
          <NoteInput note={note} setNote={setNote} />
          <Calendar date={date} setDate={setDate} />
          <WalletSelection
            wallets={wallets}
            seletedWallet={wallet}
            setSeletedWallet={setWallet}
          />
        </div>
        <Button
          className="bg-gray-700 hover:bg-sky-600 w-[80%] py-2 rounded-2xl text-sm"
          onClick={handleTransaction}
        >
          Save
        </Button>
        <div></div>
      </DrawerContent>{" "}
    </Drawer>
  );
};

export default ConfirmTransactionPopup;

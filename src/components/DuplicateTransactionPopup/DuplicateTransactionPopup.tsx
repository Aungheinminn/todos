"use client";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Categories } from "@/constants/categories";
import { useTransactionPopupStore } from "@/lib/transactionPopupStore";
import Image from "next/image";
import Calendar from "../Calendar/Calendar";
import { Button } from "../ui/button";
import { getDate } from "@/lib/utils/getDate";
import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "@/lib/userStore";

const DuplicateTransactionPopup = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUserStore((state) => state);
  const {
    isOpen: open,
    setIsOpen: setOpen,
    type,
    transactionDatas,
    resetTransactionDatas,
  } = useTransactionPopupStore((state) => state);
  const [currentDate, setCurrentDate] = useState(
    new Date(transactionDatas.date) || "",
  );

  const handleDuplicateTransaction = () => {
    const { date, category, wallet, amount, process, ...rest } =
      transactionDatas;
    const data = {
      ...rest,
      user_id: currentUser?._id || "",
      wallet_id: wallet.id,
      transaction: Number(amount),
      category: category.name,
      transaction_day: getDate(currentDate).day,
      transaction_month: getDate(currentDate).month,
      transaction_year: getDate(currentDate).year,
    };
    try {
      transactionDatas.process.mutate(data, {
        onSuccess: (data: any) => {
          if (data.success) {
            setOpen(false);
            resetTransactionDatas();
            router.push("/transactions");
          }
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!transactionDatas.date) return;
    setCurrentDate(transactionDatas.date);
  }, [transactionDatas.date]);

  return (
    <Drawer open={type === "duplicate" && open} onOpenChange={setOpen}>
      <DrawerContent className="w-full bg-gray-800 flex flex-col items-center gap-y-4">
        <DrawerHeader className="w-full flex justify-start items-center">
          <DrawerTitle className="text-base text-slate-300 font-normal">
            Duplicate Transaction
          </DrawerTitle>
        </DrawerHeader>
        <div className="w-[96%] flex justify-between items-start bg-gray-700 py-3 px-4 rounded-2xl">
          <div className="w-full flex justify-start items-start gap-x-4">
            <Image
              src={transactionDatas?.category.icon || ""}
              alt="transportation"
              className="w-8 h-8"
            />
            <p className="text-sm text-slate-300">
              {transactionDatas?.category.name}
            </p>
          </div>
          <p className="text-sm text-red-500">{transactionDatas?.amount}</p>
        </div>

        <Calendar date={currentDate} setDate={setCurrentDate} />
        <Button
          onClick={handleDuplicateTransaction}
          className="w-[96%] rounded-2xl bg-green-500 hover:bg-green-600 mb-2"
        >
          Confirm
        </Button>
      </DrawerContent>
    </Drawer>
  );
};
export default DuplicateTransactionPopup;

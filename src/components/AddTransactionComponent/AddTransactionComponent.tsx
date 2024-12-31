"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import add from "@/assets/add.svg";
import { useState } from "react";
import AmountInput from "../AmountInput/AmountInput";
import CategorySelection from "../CategorySelection/CategorySelection";
import NoteInput from "../NoteInput/NoteInput";
import Calendar from "../Calendar/Calendar";
import WalletSelection from "../WalletSelection/WalletSelection";

const AddTransactionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | string>(0);
  const [category, setCategory] = useState<{
    id: number;
    name: string;
    icon: string;
  }>({
    id: 0,
    name: "",
    icon: "",
  });
  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [wallet, setWallet] = useState<string>("Blah");
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        onClick={() => setOpen(true)}
        className="w-[80px] flex justify-center items-center"
      >
        <Image className="w-8 h-8" src={add} alt="add" />
      </DrawerTrigger>
      <DrawerContent className="w-full flex flex-col items-center justify-center bg-gray-800 py-2 gap-y-4">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose onClick={() => setOpen(false)} className="">
            Cancel
          </DrawerClose>
          <DrawerTitle className="font-medium">Add transaction</DrawerTitle>
          <p className="opacity-0">cancel</p>
        </DrawerHeader>
        <div className="w-full flex flex-col bg-gray-700 gap-y-3 py-3">
          <AmountInput amount={amount} setAmount={setAmount} />
          <CategorySelection category={category} setCategory={setCategory} />
          <NoteInput note={note} setNote={setNote} />
          <Calendar date={date} setDate={setDate} />
          <WalletSelection wallet={wallet} setWallet={setWallet} />
        </div>
        <DrawerClose
          className="bg-gray-700 w-[80%] py-2 rounded-2xl text-sm"
          onClick={() => setOpen(false)}
        >
          Save
        </DrawerClose>
        <div></div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionComponent;

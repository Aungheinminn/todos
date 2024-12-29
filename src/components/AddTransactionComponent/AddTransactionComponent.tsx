"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import add from "@/assets/add.svg";
import { useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import chevronRight from "@/assets/cheron_right.svg";
import noteIcon from "@/assets/note.svg";
import { Categories } from "@/constants/categories";
import { ScrollArea } from "../ui/scroll-area";

type AmountInputProps = {
  amount: number | string;
  setAmount: React.Dispatch<React.SetStateAction<number | string>>;
};

type CategorySelectionProps = {
  category: {
    id: number;
    name: string;
    icon: string;
  };
  setCategory: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      icon: string;
    }>
  >;
};

type NoteInputProps = {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
};

const AmountInput: React.FC<AmountInputProps> = ({ amount, setAmount }) => {
  return (
    <div className="w-full flex flex-col gap-y-1">
      <p className="mx-[75px] text-sm">Amount</p>
      <div className="w-full flex justify-start items-center gap-x-2 px-4">
        <Button className="bg-gray-600 hover:bg-gray-700 p-0 px-2 border border-slate-300 h-[30px]">
          MMK
        </Button>
        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-700 text-xl text-slate-300 pt-2 pb-3 py-1 border-0 border-b border-b-slate-500 outline-0 rounded-0"
        />
      </div>
    </div>
  );
};

const CategorySelection: React.FC<CategorySelectionProps> = ({
  category,
  setCategory,
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">
        {category.icon ? (
          <Image className="w-8 h-7 mb-3" src={category.icon} alt="category" />
        ) : (
          <Skeleton className="w-8 h-7 mb-3 rounded-full" />
        )}
        <div className="w-full flex justify-between items-center border-b border-b-slate-500 pb-3">
          <p className="text-base">{category.name || "Select Category"}</p>

          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-2/3 bg-gray-800">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose className="">Back</DrawerClose>
          <DrawerTitle className="font-medium">Select Category</DrawerTitle>
          <p className="opacity-0">Back</p>
        </DrawerHeader>
        <ScrollArea>
          <div className="w-full h-full flex flex-col gap-y-2 bg-gray-700">
            <div className=""></div>
            {Categories.map((category) => (
              <DrawerClose
                key={category.id}
                className="flex justify-start items-center gap-x-2 bg-gray-800 p-2 px-3"
                onClick={() => setCategory(category)}
              >
                <Image
                  className="w-8 h-8"
                  src={category.icon}
                  alt={category.name}
                />
                <p className="text-sm">{category.name}</p>
              </DrawerClose>
            ))}
            <div className=""></div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

const NoteInput: React.FC<NoteInputProps> = ({ note, setNote }) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">
        <Image className="w-6 h-6 mb-3" src={noteIcon} alt="note" />
        <div className="w-full flex justify-between items-center gap-x-2 border-b border-b-slate-500 ml-1 pb-3">
          <p className="text-base">{note || "Note"}</p>

          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-2/3 bg-gray-800">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose className="">Back</DrawerClose>
          <DrawerTitle className="font-medium">Note</DrawerTitle>
          <p className="opacity-0">Back</p>
        </DrawerHeader>
        <textarea
          placeholder="Enter note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-full bg-gray-800 text-slate-500 outline-0 px-4 py-2"
        ></textarea>
      </DrawerContent>
    </Drawer>
  );
};

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
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        onClick={() => setOpen(true)}
        className="w-[80px] flex justify-center items-center"
      >
        <Image className="w-8 h-8" src={add} alt="add" />
      </DrawerTrigger>
      <DrawerContent className="w-full flex flex-col items-center justify-center bg-gray-800 py-2 gap-y-2">
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
        </div>
        <DrawerClose
          className="bg-gray-700 w-[80%] py-2 rounded-2xl text-sm"
          onClick={() => setOpen(false)}
        >
          Save
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionComponent;

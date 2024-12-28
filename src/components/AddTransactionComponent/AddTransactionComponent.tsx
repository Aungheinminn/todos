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

const AmountInput = () => {
  return (
    <div className="w-full flex flex-col gap-y-1">
      <p className="mx-[75px] text-sm">Amount</p>
      <div className="w-full flex justify-start items-center gap-x-2 px-4">
        <Button className="bg-gray-600 hover:bg-gray-700 p-0 px-2 border border-slate-300 h-[30px]">
          MMK
        </Button>
        <input
          type="text"
          placeholder="0"
          className="w-full bg-gray-700 text-xl text-slate-300 pt-2 pb-3 py-1 border-0 border-b border-b-slate-500 outline-0 rounded-0"
        />
      </div>
    </div>
  );
};

const CategorySelection = () => {
	return (
		<Drawer>
			<DrawerTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">

				<Skeleton className="w-8 h-7 mb-2 rounded-full" />
				<div className="w-full flex justify-between items-center border-b border-b-slate-500 pb-3">
					<p>Select Category</p>

					<Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
				</div>
			</DrawerTrigger>
			<DrawerContent className="w-full h-2/3 bg-gray-800">
        <DrawerHeader className="w-full flex justify-between items-center">
          <DrawerClose className="">
            Back
          </DrawerClose>
          <DrawerTitle className="font-medium">Select Category</DrawerTitle>
          <p className="opacity-0">Back</p>
        </DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
};

const AddTransactionComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        onClick={() => setOpen(true)}
        className="w-[80px] flex justify-center items-center"
      >
        <Image className="w-8 h-8" src={add} alt="add" />
      </DrawerTrigger>
      <DrawerContent className="w-full flex flex-col items-center justify-center bg-gray-800 py-2 gap-y-2">
        <DrawerHeader className="w-full flex justify-between items-center">
          <DrawerClose onClick={() => setOpen(false)} className="">
            Cancel
          </DrawerClose>
          <DrawerTitle className="font-medium">Add transaction</DrawerTitle>
          <p className="opacity-0">cancel</p>
        </DrawerHeader>
        <div className="w-full flex flex-col bg-gray-700 gap-y-3 py-3">
          <AmountInput />
          <CategorySelection />
        </div>
        <DrawerClose
          className="bg-gray-700 w-[80%] py-1 rounded-2xl text-sm"
          onClick={() => setOpen(false)}
        >
          Save
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionComponent;

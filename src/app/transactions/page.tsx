"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import wallet from "@/assets/wallet_2.svg";
import caretDown from "@/assets/caret_down.svg";
import { Suspense } from "react";
import TransactionGroup from "@/components/TransactionsGroup/TransactionGroup";
import TransactionLoading from "./loading";
import { useCurrentUserStore } from "@/lib/userStore";
import { useWalletStore } from "@/lib/walletStore";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { mock } from "node:test";
import CarouselComponent from "@/components/CarouselComponent/CarouselComponent";

const TransactionHeader = () => {
  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-1 p-2 ">
      <p className="text-sm">Balance</p>
      <p>K 100,000.00</p>
      <Button className="w-[100px] flex items-center justify-center gap-x-2">
        <Image className="w-6 h-6" src={wallet} alt="transaction wallet" />
        <p>Total</p>
        <Image className="w-4" src={caretDown} alt="caret down" />
      </Button>
    </div>
  );
};
const Transactions = () => {
  const { currentUser } = useCurrentUserStore((state) => state);
  const { currentWallet } = useWalletStore((state) => state);

  const mockData = [
    { id: 1, day: "1", color: "bg-red-500" },
    { id: 2, day: "2", color: "bg-sky-500" },
    { id: 3, day: "3", color: "bg-green-500" },
    { id: 4, day: "4", color: "bg-purple-500" },
    { id: 5, day: "5", color: "bg-yellow-500" },
    { id: 6, day: "6", color: "bg-blue-500" },
    { id: 7, day: "7", color: "bg-red-500" },
    { id: 8, day: "8", color: "bg-sky-500" },
    { id: 9, day: "9", color: "bg-green-500" },
    { id: 10, day: "10", color: "bg-purple-500" },
    { id: 11, day: "11", color: "bg-yellow-500" },
    { id: 12, day: "12", color: "bg-blue-500" },

  ];

  return (
    <Suspense fallback={<TransactionLoading />}>
      <div className="w-full px-0 mx-0 bg-gray-800 pt-[55px]">
        <TransactionHeader />
        <div className="w-full flex justify-center items-center">
          <TransactionGroup />
        </div>
        <div className="w-full snap-x snap-mandatory flex overflow-x-auto">
          {mockData.map((item) => (
            <div key={item.id} className={`w-full snap-center h-[200px] flex-shrink-0 ${item.color}`}>
              {item.id}
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default Transactions;

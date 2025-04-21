"use client";

import WalletsLoading from "@/app/wallets/loading";
import SharedWallet from "@/components/SharedWallet/SharedWallet";
import Wallet from "@/components/Wallet/Wallet";
import WalletTypeSwitcher from "@/components/WalletTypeSwitcher/WalletTypeSwitcher";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSharedWallets } from "@/lib/services/sharedWallet.service";
import { getWallets } from "@/lib/services/wallet.service";
import { useSharedWalletPopupStore } from "@/lib/stores/sharedWalletPopupStore";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import { useWalletPopupStore } from "@/lib/stores/walletPopupStore";
import { SharedWalletType, WalletType } from "@/lib/types/wallet.type";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";

type WalletsHeaderProps = {
  walletType: string;
  handleToggle: (value: string) => void;
  handleCreate: () => void;
};

type WalletsBodyProps = {
  walletType: string;
  wallets: WalletType[];
  sharedWallets: SharedWalletType[];
};

const WalletsHeader: React.FC<WalletsHeaderProps> = ({
  walletType,
  handleToggle,
  handleCreate,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center py-3 border-b border-gray-700 gap-y-2">
      <h1 className="text-lg font-medium text-white">
        {walletType === "shared" ? "Shared Wallets" : "Wallets"}
      </h1>

      <div className="w-full md:w-fit flex justify-between md:justify-end  items-center gap-3">
        <WalletTypeSwitcher walletType={walletType} onToggle={handleToggle} />
        <Button
          onClick={handleCreate}
          className="px-3 py-1.5 bg-blue-600 text-sm text-white rounded-md hover:bg-blue-700"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

const WalletsBody: React.FC<WalletsBodyProps> = ({
  walletType,
  wallets,
  sharedWallets,
}) => {
  return (
    <ScrollArea>
      <div className="px-1 w-full h-[calc(100vh-240px)] flex flex-col gap-y-2">
        {walletType === "normal" &&
          wallets.map((wallet: WalletType, index: number) => (
            <Wallet key={index} wallet={wallet} />
          ))}

        {walletType === "shared" &&
          sharedWallets.map((sharedWallet: SharedWalletType, index: number) => (
            <SharedWallet key={index} wallet={sharedWallet} />
          ))}
      </div>
    </ScrollArea>
  );
};

const Wallets = () => {
  const { currentUser } = useCurrentUserStore((state) => state);

  const { setIsOpen: setSharedWalletIsOpen, setType: setSharedWalletOpenType } =
    useSharedWalletPopupStore((state) => state);
  const { setIsOpen: setWalletIsOpen, setType: setWalletOpenType } =
    useWalletPopupStore((state) => state);

  const [walletType, setWalletType] = useState<string>("normal");
  const handleToggle = (value: string) => {
    setWalletType(value);
  };

  const { data: sharedWallets } = useQuery({
    queryKey: ["sharedWallets", walletType],
    queryFn: () => getSharedWallets(currentUser?._id || ""),
    enabled: !!currentUser && walletType === "shared",
  });

  const { data: wallets } = useQuery({
    queryKey: ["wallets", walletType],
    queryFn: () => getWallets(currentUser?._id || ""),
    enabled: !!currentUser && walletType === "normal",
  });

  const handleCreate = () => {
    if (walletType === "shared") {
      console.log("hi");
      setSharedWalletOpenType("create");
      setSharedWalletIsOpen(true);
    } else {
      console.log("hello");
      setWalletOpenType("create");
      setWalletIsOpen(true);
    }
  };

  return (
    <Suspense fallback={<WalletsLoading />}>
      <div className="pt-[55px] flex flex-col w-full px-2 gap-y-3">
        <WalletsHeader
          walletType={walletType}
          handleToggle={handleToggle}
          handleCreate={handleCreate}
        />
        <WalletsBody
          walletType={walletType}
          wallets={wallets || []}
          sharedWallets={sharedWallets || []}
        />
      </div>
    </Suspense>
  );
};

export default Wallets;

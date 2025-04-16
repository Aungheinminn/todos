"use client";

import WalletsLoading from "@/app/wallets/loading";
import SharedWallet from "@/components/SharedWallet/SharedWallet";
import Wallet from "@/components/Wallet/Wallet";
import WalletTypeSwitcher from "@/components/WalletTypeSwitcher/WalletTypeSwitcher";
import { Button } from "@/components/ui/button";
import { getSharedWallets } from "@/lib/services/sharedWallet.service";
import { useSharedWalletPopupStore } from "@/lib/stores/sharedWalletPopupStore";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import { useWalletPopupStore } from "@/lib/stores/walletPopupStore";
import { WalletType } from "@/lib/types/wallet.type";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";

type WalletHeaderProps = {
  walletType: string;
  handleToggle: (value: string) => void;
  handleCreate: () => void;
};

const WalletHeader: React.FC<WalletHeaderProps> = ({
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
    queryKey: ["sharedWallets"],
    queryFn: () => getSharedWallets(currentUser?._id || ""),
    enabled: !!currentUser && walletType === "shared",
  });

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getSharedWallets(currentUser?._id || ""),
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
  const sampleWallet: WalletType = {
    _id: "1",
    wallet_name: "Personal Savings",
    user_id: "user123",
    created_at: new Date(),
    currency: "USD",
    balance: 5000.75,
    current: true,
    shared_user_ids: ["john_doe", "jane_smith", "bob_wilson", "alice"],
  };

  return (
    <Suspense fallback={<WalletsLoading />}>
      <div className="pt-[55px] flex flex-col w-full px-2 gap-y-3">
        <WalletHeader
          walletType={walletType}
          handleToggle={handleToggle}
          handleCreate={handleCreate}
        />
        <SharedWallet wallet={sampleWallet} />
        <Wallet wallet={sampleWallet} />
      </div>
    </Suspense>
  );
};

export default Wallets;

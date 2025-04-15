"use client";

import SharedWalletsLoading from "@/app/shared-wallets/loading";
import SharedWallet from "@/components/SharedWallet/SharedWallet";
import { WalletType } from "@/lib/types/wallet.type";
import { Suspense } from "react";

const SharedWallets = () => {
  const sampleWallet: WalletType = {
    _id: "1",
    wallet_name: "Personal Savings",
    user_id: "user123",
    created_at: new Date(),
    currency: "USD",
    balance: 5000.75,
    current: true,
    shared_user_ids: ["john_doe", "jane_smith", "bob_wilson"],
  };
  return (
    <Suspense fallback={<SharedWalletsLoading />}>
      <div className="pt-[55px] flex flex-col w-full px-2 gap-y-3">
        <h1>Shared Wallets</h1>
        <SharedWallet wallet={sampleWallet} />
      </div>
    </Suspense>
  );
};

export default SharedWallets;

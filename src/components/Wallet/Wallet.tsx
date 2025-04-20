"use client";

import { WalletType } from "@/lib/types/wallet.type";
import Link from "next/link";

type WalletProps = {
  wallet: WalletType;
};

const Wallet: React.FC<WalletProps> = ({ wallet }) => {
  return (
    <Link
      href={`/wallets/${wallet._id}`}
      className="bg-gray-700 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {wallet.wallet_name}
            {wallet.current && (
              <span className="ml-2 text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                Current
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500">
            Created:{" "}
            {wallet.created_at &&
              new Date(wallet.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-gray-600 font-medium">{wallet.currency}</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-3xl font-bold text-white">{wallet.balance}</p>
      </div>
    </Link>
  );
};

export default Wallet;

import { useWalletStore } from "@/lib/walletStore";
import Image from "next/image";
import walletIcon from "@/assets/wallet.svg";
import AddWallet from "../AddWallet/AddWallet";
import { WalletType } from "@/lib/types/wallet.type";

import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useWalletMutation } from "@/lib/walletMutation";
import WalletSettings from "../WalletSettings/WalletSettings";
import { useRouter } from "next/navigation";

type TotalWalletsProps = {
  wallets: WalletType[];
};

type WalletComponentProps = {
  currentlyShown?: boolean;
  wallet: WalletType;
};

const WalletComponent: React.FC<WalletComponentProps> = ({
  currentlyShown,
  wallet,
}) => {
  const router = useRouter();
  const { updateCurrentWalletMutation, deleteMutation } = useWalletMutation();
  const { updateCurrentWallet } = useWalletStore((state) => state);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleSettingsOpenChange = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleClick = () => {
    if (currentlyShown) return;
    setIsSettingsOpen(true);
  };

  const handleSetDefault = () => {
    updateCurrentWalletMutation.mutate(
      { wallet_id: wallet._id || "", user_id: wallet.user_id },
      {
        onSuccess: (data) => {
          if (data.success) {
            updateCurrentWallet(data.data);
            setIsSettingsOpen(false);
          }
        },
      },
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      id: wallet.user_id,
      wallet_id: wallet._id || "",
    });
  };

  const handleViewDetails = () => {
    console.log(wallet);
    router.push(`/wallet/${wallet._id}`);
  };

  return (
    <WalletSettings
      isOpen={isSettingsOpen}
      currentlyShown={currentlyShown}
      handleClick={handleClick}
      handleDelete={handleDelete}
      handleSetDefault={handleSetDefault}
      handleViewDetails={handleViewDetails}
      handleOpenChange={handleSettingsOpenChange}
    >
      <div
        className={`w-full flex justify-between items-center p-3 ${!currentlyShown ? "hover:bg-gray-600" : ""}`}
      >
        <div className="flex justify-start items-center gap-x-3">
          <Image className="w-6 h-6" src={walletIcon} alt="wallet" />
          <p className="text-sm text-white">{wallet.wallet_name}</p>
        </div>
        <div className="flex justify-end items-center gap-x-3">
          <div className={`flex h-[20px] justify-center items-center gap-x-1 bg-green-500 px-2 rounded ${currentlyShown && "hidden"} ${!wallet.current ? "hidden" : ""}`}><p className="mb-[3px]">curr</p></div>
        <p className="text-sm text-white">K{wallet.balance}</p>
        </div>
      </div>
    </WalletSettings>
  );
};

const TotalWallets: React.FC<TotalWalletsProps> = ({ wallets }) => {
  const [isWalletOpen, setWalletOpen] = useState<boolean>(false);

  const currentWallet = wallets && wallets.find((w) => w.current === true);
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenChange = () => {
    setIsOpen(!isOpen);
  };
  console.log("total isOpen", isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className="hidden"></DialogTrigger>
      <div className="w-[95%] bg-gray-700 rounded-xl py-1 flex flex-col hover:no-underline ">
        <div className="w-full flex justify-between items-center border-b border-b-slate-600 py-3">
          <p className="text-sm text-white pl-3">My Wallets</p>
          <button
            onClick={handleOpenChange}
            className="text-sm text-green-300 pr-3"
          >
            See All
          </button>
        </div>
        {currentWallet && (
          <WalletComponent currentlyShown={true} wallet={currentWallet} />
        )}
      </div>
      <DialogContent
        ref={ref}
        className="bg-gray-700 px-1 flex flex-col gap-y-1"
      >
        <DialogTitle className="text-base text-white px-3">Wallets</DialogTitle>
        {wallets
          ? wallets.map((wallet) => (
              <WalletComponent
                currentlyShown={false}
                key={wallet._id}
                wallet={wallet}
              />
            ))
          : ""}
        <AddWallet open={isWalletOpen} setOpen={setWalletOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default TotalWallets;

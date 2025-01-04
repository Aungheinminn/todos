import { useWalletStore } from "@/lib/walletStore";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import walletIcon from "@/assets/wallet.svg";
import AddWallet from "../AddWallet/AddWallet";
import { WalletType } from "@/lib/types/wallet.type";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import add from "@/assets/add_wallet.svg";
import closeIcon from "@/assets/cross_x.svg";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { usePressHook } from "@/hooks/usePressHook";
import { useWalletMutation } from "@/lib/walletMutation";

type TotalWalletsProps = {
  wallets: WalletType[];
};

type WalletComponentProps = {
  currentlyShown?: boolean;
  wallet: WalletType;
};

const WalletComponent: React.FC<WalletComponentProps> = ({ currentlyShown, wallet }) => {
  const { updateCurrentWalletMutation } = useWalletMutation();

  const handleMouseClick = () => {
    if (currentlyShown) return;
    updateCurrentWalletMutation.mutate({ wallet_id: wallet._id || "", user_id: wallet.user_id });
    console.log("clicking");
  };

  const handleMousePress = () => {
    if (currentlyShown) return;
    console.log("pressing");
  };
  const { handleMouseDown, handleMouseUp } = usePressHook({
    mousePressFunction: handleMousePress,
    mouseClickFunction: handleMouseClick,
  });
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`w-full  flex justify-between items-center p-3 ${!currentlyShown ? "hover:bg-gray-600" : ""}`}
    >
      <div className="flex justify-start items-center gap-x-3">
        <Image className="w-6 h-6" src={walletIcon} alt="wallet" />
        <p className="text-sm text-white">{wallet.wallet_name}</p>
      </div>
      <p className="text-sm text-white">K{wallet.balance}</p>
    </div>
  );
};

const TotalWallets: React.FC<TotalWalletsProps> = ({ wallets }) => {
  const { isOpen: isWalletOpen, setIsOpen: setWalletOpen } = useWalletStore(
    (state) => state,
  );

  const currentWallet = wallets && wallets.find((w) => w.current === true);
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenChange = () => {
    setIsOpen(!isOpen);
  };
  console.log("isOpen", isOpen);

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
        {currentWallet && <WalletComponent currentlyShown={true} wallet={currentWallet} />}
      </div>
      <DialogContent
        ref={ref}
        className="bg-gray-700 px-1 flex flex-col gap-y-1"
      >
        <DialogTitle className="text-base text-white px-3">Wallets</DialogTitle>
        {wallets
          ? wallets
              .map((wallet) => (
                <WalletComponent currentlyShown={false} key={wallet._id} wallet={wallet} />
              ))
          : ""}
        <AddWallet open={isWalletOpen} setOpen={setWalletOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default TotalWallets;

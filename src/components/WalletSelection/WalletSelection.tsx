import { useQuery } from "react-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import walletIcon from "@/assets/wallet.svg";
import chevronRight from "@/assets/cheron_right.svg";
import tickIcon from "@/assets/tick.svg";
import { getWallets } from "@/lib/wallet.service";
import { useCurrentUserStore } from "@/lib/userStore";
import { WalletType } from "@/lib/types/wallet.type";

type WalletSelectionProps = {
  wallets: WalletType[];
  seletedWallet: {
    id: string;
    wallet_name: string;
  };
  setSeletedWallet: React.Dispatch<
    React.SetStateAction<{
      id: string;
      wallet_name: string;
    }>
  >;
};

const WalletSelection: React.FC<WalletSelectionProps> = ({
  wallets,
  seletedWallet,
  setSeletedWallet,
}) => {
  console.log(seletedWallet, "seleted");
  return (
    <Drawer>
      <DrawerTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">
        <Image className="w-6 h-6 mb-3" src={walletIcon} alt="note" />
        <div className="w-full flex justify-between items-center gap-x-2 border-b border-b-slate-500 ml-1 pb-3">
          <p className="text-base">{seletedWallet.wallet_name}</p>

          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-2/3 bg-gray-800">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose className="">Back</DrawerClose>
          <DrawerTitle className="font-medium">Select Wallet</DrawerTitle>
          <DrawerDescription className="opacity-0">Back</DrawerDescription>
        </DrawerHeader>
        <div className="w-full flex flex-col gap-y-2">
          <p className="px-3 pt-3 text-slate-500">INCLUDED IN TOTAL</p>

          {wallets && wallets.map((wallet: WalletType) => (
            <DrawerClose
              onClick={() =>
                setSeletedWallet({
                  id: wallet._id || "",
                  wallet_name: wallet.wallet_name,
                })
              }
              key={wallet._id}
              className="cursor-pointer w-full flex justify-between bg-gray-700 items-center py-2 px-3"
            >
              <div className="flex justify-start items-center gap-x-4">
                <Image className="w-6 h-6" src={walletIcon} alt="wallet" />
                <div className="flex flex-col">
                  <p className="text-sm text-left">{wallet.wallet_name}</p>
                  <p className="text-sm text-left">K {wallet.balance}</p>
                </div>
              </div>
              <Image
                className={`w-4 h-4 ${wallet._id === seletedWallet.id ? "opacity-100" : "opacity-0"}`}
                src={tickIcon}
                alt="chevron right"
              />
            </DrawerClose>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WalletSelection;

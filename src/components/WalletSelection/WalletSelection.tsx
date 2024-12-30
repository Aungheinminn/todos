import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import walletIcon from "@/assets/wallet.svg";
import chevronRight from "@/assets/cheron_right.svg";
import tickIcon from "@/assets/tick.svg";

type WalletSelectionProps = {
  wallet: string;
  setWallet: React.Dispatch<React.SetStateAction<string>>;
};

const WalletSelection: React.FC<WalletSelectionProps> = ({
  wallet,
  setWallet,
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">
        <Image className="w-6 h-6 mb-3" src={walletIcon} alt="note" />
        <div className="w-full flex justify-between items-center gap-x-2 border-b border-b-slate-500 ml-1 pb-3">
          <p className="text-base">{wallet}</p>

          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-2/3 bg-gray-800">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose className="">Back</DrawerClose>
          <DrawerTitle className="font-medium">Select Wallet</DrawerTitle>
          <p className="opacity-0">Back</p>
        </DrawerHeader>
        <div className="w-full flex flex-col gap-y-2">
          <p className="px-3 pt-3 text-slate-500">INCLUDED IN TOTAL</p>
          <div className="w-full flex justify-between bg-gray-700 items-center py-2 px-3">
            <div className="flex justify-start items-center gap-x-4">
              <Image className="w-6 h-6" src={walletIcon} alt="wallet" />
              <div className="flex flex-col">
                <p className="text-sm">Wallet</p>
                <p className="text-sm">K 100,000.00</p>
              </div>
            </div>
            <Image className="w-4 h-4" src={tickIcon} alt="chevron right" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WalletSelection;

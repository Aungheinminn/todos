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

const WalletComponent = () => {
  return (
    <div className="w-full flex justify-between items-center p-3">
      <div className="flex justify-start items-center gap-x-3">
        <Image className="w-6 h-6" src={walletIcon} alt="wallet" />
        <p className="text-sm text-white">Wallet</p>
      </div>
      <p className="text-sm text-white">$0.00</p>
    </div>
  );
};

const TotalWallets = () => {
  const { isOpen: walletOpen, setIsOpen: setWalletOpen } = useWalletStore(
    (state) => state,
  );
  return (
    <Accordion type="single" collapsible className="w-full px-2">
      <AccordionItem
        className="w-full bg-gray-700 px-1 rounded-md"
        value="item-1"
      >
        <AccordionTrigger
          disabled_cheveron
          className="w-full py-1 flex flex-col hover:no-underline "
        >
          <div className="w-full flex justify-between items-center border-b border-b-slate-600 py-3">
            <p className="text-sm text-white pl-3">My Wallets</p>
            <p className="text-sm text-green-300 pr-3">See All</p>
          </div>
          <WalletComponent />
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-y-1">
          <WalletComponent />
          <WalletComponent />
          <WalletComponent />
          <AddWallet open={walletOpen} setOpen={setWalletOpen} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default TotalWallets;

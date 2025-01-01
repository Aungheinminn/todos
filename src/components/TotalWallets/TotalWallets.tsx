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

type TotalWalletsProps = {
  wallets: WalletType[];
};

type WalletComponentProps = {
  wallet: WalletType;
};

const WalletComponent: React.FC<WalletComponentProps> = ({ wallet }) => {
  return (
    <div className="w-full flex justify-between items-center p-3">
      <div className="flex justify-start items-center gap-x-3">
        <Image className="w-6 h-6" src={walletIcon} alt="wallet" />
        <p className="text-sm text-white">{wallet.wallet_name}</p>
      </div>
      <p className="text-sm text-white">K{wallet.balance}</p>
    </div>
  );
};

const TotalWallets: React.FC<TotalWalletsProps> = ({ wallets }) => {
  const { isOpen: walletOpen, setIsOpen: setWalletOpen } = useWalletStore(
    (state) => state,
  );
  const currentWallet = wallets && wallets.find((w) => w.current === true);
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
	  {currentWallet && <WalletComponent wallet={currentWallet} />
	  }
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-y-1">
          {wallets
            ? wallets
                .filter((w) => w.current !== true)
                .map((wallet) => (
                  <WalletComponent key={wallet._id} wallet={wallet} />
                ))
            : ""}
          <AddWallet open={walletOpen} setOpen={setWalletOpen} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default TotalWallets;

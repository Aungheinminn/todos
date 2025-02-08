import Image from "next/image";
import walletIcon from "@/assets/wallet.svg";

type WalletInputProps = {
  wallet: string;
  setWallet: React.Dispatch<React.SetStateAction<string>>;
};

const WalletInput: React.FC<WalletInputProps> = ({ wallet, setWallet }) => {
  return (
    <div className="w-full flex justify-start bg-gray-700 items-center gap-x-4 px-4 py-1 border-b border-b-slate-500">
      <Image className="w-6 h-6" src={walletIcon} alt="wallet" />
      <input
        type="text"
        placeholder="Name"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="w-full bg-gray-700 text-xl text-slate-300 pt-2 pb-3 py-1 outline-0 rounded-0"
      />
    </div>
  );
};

export default WalletInput;

import Image from "next/image";
import walletIcon from "@/assets/wallet.svg";

type InitialAmountInputProps = {
  initialAmount: number | string;
  setInitialAmount: React.Dispatch<React.SetStateAction<number | string>>;
};

const InitialAmountInput: React.FC<InitialAmountInputProps> = ({
  initialAmount,
  setInitialAmount,
}) => {
  return (
    <div className="w-full flex justify-start bg-gray-700 items-center gap-x-4 px-4 py-1 border-b border-b-slate-500">
      <div className="w-6 h-6"> </div>
      <div className="w-full flex flex-col">
        <p className="text-sm text-slate-300">Initial Balance</p>
        <input
          type="number"
          placeholder="0"
          value={initialAmount}
          onChange={(e) => setInitialAmount(e.target.value)}
          className="w-full bg-gray-700 text-xl text-slate-300 py-1 outline-0 rounded-0"
        />
      </div>
    </div>
  );
};

export default InitialAmountInput;

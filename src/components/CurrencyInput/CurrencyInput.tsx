import Image from "next/image";
import currencyIcon from "@/assets/currency.svg";
import chevronRight from "@/assets/cheron_right.svg";

type CurrencyInputProps = {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  currency,
  setCurrency,
}) => {
  return (
    <div className="cursor-not-allowed w-full flex justify-between bg-gray-700 items-center gap-x-4 px-4 py-1 border-b border-b-slate-500">
      <Image className="w-6 h-6" src={currencyIcon} alt="wallet" />
      <div className="w-full flex justify-between items-center gap-x-2">
        <input
          type="text"
          placeholder="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="cursor-not-allowed w-full bg-gray-700 text-xl text-slate-300 pt-2 pb-3 py-1 outline-0 rounded-0"
        />
          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
      </div>
    </div>
  );
};

export default CurrencyInput;

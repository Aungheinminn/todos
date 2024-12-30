import { Button } from "../ui/button";

type AmountInputProps = {
  amount: number | string;
  setAmount: React.Dispatch<React.SetStateAction<number | string>>;
};

const AmountInput: React.FC<AmountInputProps> = ({ amount, setAmount }) => {
  return (
    <div className="w-full flex flex-col gap-y-1">
      <p className="mx-[75px] text-sm">Amount</p>
      <div className="w-full flex justify-start items-center gap-x-2 px-4">
        <Button className="bg-gray-600 hover:bg-gray-700 p-0 px-2 border border-slate-300 h-[30px]">
          MMK
        </Button>
        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-700 text-xl text-slate-300 pt-2 pb-3 py-1 border-0 border-b border-b-slate-500 outline-0 rounded-0"
        />
      </div>
    </div>
  );
};

export default AmountInput;

import Image from "next/image";
import transportation from "@/assets/transportation.svg";
import { TransactionType } from "@/lib/types/transaction.type";
import { Categories } from "@/constants/categories";
import Link from "next/link";

type TransactionCardProps = {
  transaction: TransactionType;
};
const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <Link
      href={`/transactions/${transaction._id}`}
      className="duration-300 cursor-pointer w-full flex justify-between items-center bg-gray-700 hover:bg-slate-400 px-3 py-4"
    >
      <div className="flex justify-start gap-x-3 items-start">
        <Image
          className="w-8 h-8"
          src={
            Categories.find((cate) => cate.name === transaction.category)?.icon
          }
          alt="transportation"
        />
        <div className="flex flex-col gap-y-1 items-start">
        <p className="text-sm">{transaction.category}</p>
          <p className="text-xs text-slate-400">{transaction.note || ""}</p>
        </div>
      </div>
      <p className="text-sm">{transaction.transaction}</p>
    </Link>
  );
};

export default TransactionCard;

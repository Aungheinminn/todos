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
      <div className="flex justify-start gap-x-2 items-center">
        <Image
          className="w-6 h-6"
          src={
            Categories.find((cate) => cate.name === transaction.category)?.icon
          }
          alt="transportation"
        />
        <p className="text-sm">{transaction.category}</p>
      </div>
      <p className="text-sm">{transaction.transaction}</p>
    </Link>
  );
};

export default TransactionCard;

import Image from "next/image";
import transportation from "@/assets/transportation.svg";
import { TransactionType } from "@/lib/types/transaction.type";
import { Categories } from "@/constants/categories";

type TransactionCardProps = {
  transaction: TransactionType;
};
const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <div className="cursor-pointer w-full flex justify-between items-center bg-gray-700 px-3 py-4">
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
    </div>
  );
};

export default TransactionCard;

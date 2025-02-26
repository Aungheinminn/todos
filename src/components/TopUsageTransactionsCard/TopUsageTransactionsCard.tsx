import { Categories } from "@/constants/categories";
import { TransactionType } from "@/lib/types/transaction.type";
import Image from "next/image";
import Link from "next/link";

type TopUsageTransactionsCardProps = {
  transactions: TransactionType[];
};

const TopUsageTransactionCard = ({
  transaction,
}: {
  transaction: TransactionType;
}) => {
  return (
    <div className="w-full h-[30px] flex justify-between items-center rounded-md px-2">
      <Link
        href={`/transactions/${transaction._id}`}
        className="h-full flex justify-start items-center bg-gray-800 px-2 rounded-md gap-x-2"
      >
        <Image
          src={
            Categories.find((cate) => cate.name === transaction.category)?.icon
          }
          alt={transaction.category}
          className="w-5 h-5"
        />
        <p className="text-sm text-white">{transaction.category}</p>
      </Link>
      <p className="truncate">{transaction.transaction}</p>
    </div>
  );
};

const TopUsageTransactionsCard: React.FC<TopUsageTransactionsCardProps> = ({
  transactions,
}) => {
  return (
    <div className="w-full flex flex-col gap-y-1 bg-gray-700 rounded-md p-1">
      <p className="text-sm text-white px-2">Top Usages</p>
      {transactions.map((transaction) => (
        <TopUsageTransactionCard
          key={transaction._id}
          transaction={transaction}
        />
      ))}
    </div>
  );
};

export default TopUsageTransactionsCard;

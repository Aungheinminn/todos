import { TransactionType } from "@/lib/types/transaction.type";
import TransactionCard from "../TransactionCard/TransactionCard";
import { useMemo } from "react";
type TransactionGroupProps = {
  date: {
    day: number | string;
    month: number | string;
    year: number | string;
  };
  transactions: TransactionType[];
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TransactionGroupHeader = ({
  date,
  totalCost,
}: {
  date: TransactionGroupProps["date"];
  totalCost: number;
}) => {
  return (
    <div className="w-full flex justify-between items-center px-2 py-3">
      <div className="flex justify-start items-end gap-x-2">
        <p className="text-2xl w-8 text-center">{date.day}</p>
        <p className="text-sm text-gray-400">
          {months[Number(date.month) - 1]} {date.year}
        </p>
      </div>
      <p>{totalCost}</p>
    </div>
  );
};
const TransactionGroup: React.FC<TransactionGroupProps> = ({
  date,
  transactions,
}) => {
  const totalCosts = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      return Number(total) + Number(transaction.transaction);
    }, 0);
  }, [transactions]);

  return (
    <div className="w-full bg-gray-700">
      <TransactionGroupHeader date={date} totalCost={totalCosts} />
      {transactions &&
        transactions.map((transaction, idx) => (
          <TransactionCard key={transaction?._id || idx} transaction={transaction} />
        ))}
    </div>
  );
};

export default TransactionGroup;

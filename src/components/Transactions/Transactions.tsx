import { TransactionType } from "@/lib/types/transaction.type";
import TransactionGroup from "../TransactionsGroup/TransactionGroup";
import { useMemo } from "react";

type TransactionsProps = {
  transactions: TransactionType[];
};

interface GroupedTransactions {
  [key: number]: TransactionType[];
}

const TransactionsComponent: React.FC<TransactionsProps> = ({
  transactions,
}) => {
  const transactionsByDate = useMemo(() => {
    return (
      transactions &&
      transactions.reduce((groups, transaction) => {
        const { transaction_day } = transaction;
        if (!groups[transaction_day]) {
          groups[transaction_day] = [];
        }
        groups[transaction_day].push(transaction);
        return groups;
      }, {} as GroupedTransactions)
    );
  }, [transactions]);
  const a =
    transactionsByDate &&
    Object.entries(transactionsByDate).map(([day, transaction]) => ({
      day,
      transaction,
    }));

  console.log("transactions", transactions, a);

  return (
    <div className="w-full flex flex-col gap-y-3">
      {transactionsByDate &&
        Object.entries(transactionsByDate).map(([day, transaction]) => (
          <TransactionGroup key={day} date={{
						day: day,
						month: transaction[0].transaction_month,
						year: transaction[0].transaction_year
					}} transactions={transaction} />
        ))}
    </div>
  );
};

export default TransactionsComponent;

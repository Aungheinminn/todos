import { TransactionType } from "@/lib/types/transaction.type";
import TransactionGroup from "../TransactionsGroup/TransactionGroup";
import { useMemo } from "react";
import { ScrollArea } from "../ui/scroll-area";

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
        const { created_at } = transaction;
          const getCreatedAtDate = new Date(created_at).getDate();
        if (!groups[getCreatedAtDate]) {
          groups[getCreatedAtDate] = [];
        }
        groups[getCreatedAtDate].push(transaction);
        return groups;
      }, {} as GroupedTransactions)
    );
  }, [transactions]);
  return (
    <ScrollArea className="h-[calc(100vh-211px)]">
      <div className="flex flex-col justify-start bg-gray-800 gap-y-3 p-1 pb-14">
        {transactionsByDate &&
          Object.entries(transactionsByDate)
            .reverse()
            .map(([day, transaction]) => (
              <TransactionGroup
                key={day}
                date={{
                  day: day,
                  month: transaction[0].transaction_month,
                  year: transaction[0].transaction_year,
                }}
                transactions={transaction}
              />
            ))}
      </div>
    </ScrollArea>
  );
};

export default TransactionsComponent;

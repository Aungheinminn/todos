import { TransactionType } from "@/lib/types/transaction.type";
import TransactionGroup from "../TransactionsGroup/TransactionGroup";
import { useMemo } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "@/components/ui/button";

type TransactionsProps = {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  transactions: TransactionType[];
  height?: string;
};

interface GroupedTransactions {
  [key: number]: TransactionType[];
}

const TransactionsComponent: React.FC<TransactionsProps> = ({
  limit,
  setLimit,
  transactions,
  height,
}) => {
  console.log("transactions", transactions.length, limit);
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
    <ScrollArea style={{ height: height || "calc(100vh - 211px)" }}>
      <div className="flex flex-col justify-start items-center bg-gray-800 gap-y-3 p-1 pb-14">
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

        <Button
          disabled={transactions.length < limit}
          className="w-[100px] rounded-xl bg-gray-700"
          onClick={() => setLimit(limit + 5)}
        >
          Load more
        </Button>
      </div>
    </ScrollArea>
  );
};

export default TransactionsComponent;

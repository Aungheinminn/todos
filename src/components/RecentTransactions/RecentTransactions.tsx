"use client";
import { TransactionType } from "@/lib/types/transaction.type";
import Link from "next/link";
import { Card } from "@/components/ui/card";


type RecentTransactionsProps = {
  recentTransactions?: TransactionType[];
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  recentTransactions = [],
}) => {
  // Use transactions directly from API
  const transactions = recentTransactions || [];

  return (
    <div className="w-full flex flex-col items-start gap-y-2 p-2 bg-gray-700 rounded-xl">
      <div className="w-full flex justify-between items-center px-2">
        <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
        <Link href="/transactions" className="text-sm text-blue-400 hover:underline">
          View All
        </Link>
      </div>
      
      <div className="w-full">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <Card className="w-full mb-2 p-3 flex justify-center items-center bg-gray-800 border-0">
            <p className="text-gray-400">No recent transactions</p>
          </Card>
        )}
      </div>
    </div>
  );
};

// Transaction item component to display individual transactions
const TransactionItem: React.FC<{ transaction: TransactionType }> = ({
  transaction,
}) => {
  const isExpense = Number(transaction.transaction) < 0;
  const formattedAmount = `K ${Math.abs(Number(transaction.transaction)).toLocaleString()}`;
  
  const date = new Date(transaction.created_at);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
  
  return (
    <Card className="w-full mb-2 p-3 flex justify-between items-center bg-gray-800 border-0">
      <div className="flex flex-col">
        <p className="font-medium text-white">{transaction.category}</p>
        <p className="text-xs text-gray-400">{transaction.note}</p>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>
      <p className={`font-semibold ${isExpense ? "text-red-400" : "text-green-400"}`}>
        {isExpense ? "-" : "+"}{formattedAmount}
      </p>
    </Card>
  );
};

export default RecentTransactions;

import TransactionCard from "../TransactionCard/TransactionCard";

const TransactionGroupHeader = () => {
  return (
    <div className="w-full flex justify-between items-center px-2 py-3">
      <div className="flex justify-start items-end gap-x-2">
        <p className="text-2xl">27</p>
        <p className="text-sm text-gray-400">December 2024</p>
      </div>
      <p>100,000.00</p>
    </div>
  );
};
const TransactionGroup = () => {
  return (
    <div className="w-full bg-gray-700">
      <TransactionGroupHeader />
      <TransactionCard />
    </div>
  );
};

export default TransactionGroup;

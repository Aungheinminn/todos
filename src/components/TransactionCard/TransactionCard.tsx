import Image from "next/image";
import transportation from "@/assets/transportation.svg";

const TransactionCard = () => {
  return (
    <div className="w-full flex justify-between items-center bg-gray-700 px-3 py-4">
      <div className="flex justify-start gap-x-2 items-center">
        <Image className="w-6 h-6" src={transportation} alt="transportation" />
        <p className="text-sm">Transportation</p>
      </div>
      <p className="text-sm">1,0000.00</p>
    </div>
  );
};

export default TransactionCard;

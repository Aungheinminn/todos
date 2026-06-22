import Link from "next/link";
import Image from "next/image";
import UserAvatar from "../UserAvatar/UserAvatar";
import whiteHouse from "@/assets/white_home.svg";
import transactions from "@/assets/transaction_page_indicator_icon.svg";
import wallets from "@/assets/wallet_page_indicator_icon.svg";
import budgets from "@/assets/budget.svg";
import add from "@/assets/add.svg";
import { usePathname } from "next/navigation";
import { useTransactionPopupStore } from "@/lib/stores/transactionPopupStore";

const Sidebar = ({ isEnoughtSpace }: { isEnoughtSpace: boolean }) => {
  const pathname = usePathname();
  const activeRoute = pathname ? pathname.split("/")[1] : "home";
  const { setIsOpen, setType } = useTransactionPopupStore((state) => state);

  const handleAddClick = () => {
    setType("create");
    setIsOpen(true);
  };

  return (
    <div className="hidden md:flex w-full h-screen flex-col pt-4 justify-between">
      <div className="px-6 py-4 mb-6">
        <h1 className="text-xl font-bold text-white">Logo</h1>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <Link
          href="/home"
          className={`flex items-center gap-3 p-3 rounded-lg ${!isEnoughtSpace ? "justify-center xl:justify-start" : "justify-start"} ${activeRoute === "home" ? "bg-blue-600" : "hover:bg-gray-800"}`}
        >
          <Image src={whiteHouse} alt="Home" width={24} height={24} />
          <span className={`${!isEnoughtSpace && "hidden xl:block"}`}>
            Home
          </span>
        </Link>

        <Link
          href="/transactions"
          className={`flex items-center gap-3 p-3 rounded-lg ${!isEnoughtSpace ? "justify-center xl:justify-start" : "justify-start"} ${activeRoute === "transactions" ? "bg-blue-600" : "hover:bg-gray-800"}`}
        >
          <Image src={transactions} alt="Transactions" width={24} height={24} />
          <span className={`${!isEnoughtSpace && "hidden xl:block"}`}>
            Transactions
          </span>
        </Link>

        <Link
          href="/wallets"
          className={`flex items-center gap-3 p-3 rounded-lg ${!isEnoughtSpace ? "justify-center xl:justify-start" : "justify-start"} ${activeRoute === "wallets" ? "bg-blue-600" : "hover:bg-gray-800"}`}
        >
          <Image src={wallets} alt="Wallets" width={24} height={24} />
          <span className={`${!isEnoughtSpace && "hidden xl:block"}`}>
            Wallets
          </span>
        </Link>

        <Link
          href="/budgets"
          className={`flex items-center gap-3 p-3 rounded-lg ${!isEnoughtSpace ? "justify-center xl:justify-start" : "justify-start"} ${activeRoute === "budgets" ? "bg-blue-600" : "hover:bg-gray-800"}`}
        >
          <Image src={budgets} alt="Budgets" width={24} height={24} />
          <span className={`${!isEnoughtSpace && "hidden xl:block"}`}>
            Budgets
          </span>
        </Link>

        <button
          onClick={handleAddClick}
          className={`flex ${!isEnoughtSpace ? "justify-center xl:justify-start" : "justify-start"} items-center gap-3 p-3 mt-4 bg-blue-500 hover:bg-blue-600 rounded-lg`}
        >
          <Image src={add} alt="Add" width={24} height={24} />
          <span className={`${!isEnoughtSpace && "hidden xl:block"}`}>Add</span>
        </button>
      </div>

      {/* Profile section at bottom of sidebar */}
      <div className="p-4 mt-auto border-t border-gray-700">
        <UserAvatar />
      </div>
    </div>
  );
};

export default Sidebar;

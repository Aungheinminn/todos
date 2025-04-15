"use client";
import add from "@/assets/add.svg";
import whiteHouse from "../../assets/white_home.svg";
import notifications from "@/assets/notification.svg";
import wallets from "../../assets/wallet_page_indicator_icon.svg";
import transactions from "../../assets/transaction_page_indicator_icon.svg";
import budgets from "@/assets/budget.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNotificationStore } from "@/lib/stores/notificationStore";
import { useTransactionPopupStore } from "@/lib/stores/transactionPopupStore";

const Bottombar = () => {
  const { pendingNotifications } = useNotificationStore((state) => state);
  const path = usePathname();
  const [active, setActive] = useState(
    path ? path.split("/")[1].toString() : "home",
  );
  const activeInterface = "bg-[#0ea5e9] rounded-lg";

  const handleChange = (current: string) => {
    setActive(current);
  };

  const { setIsOpen, setType } = useTransactionPopupStore((state) => state);

  useEffect(() => {
    if (path) {
      setActive(path.split("/")[1].toString());
    }
  }, [path]);

  return (
    <div className="z-30 w-full flex justify-between items-center bg-gray-800 lg:hidden px-2 h-[50px] border-t border-slate-500">
      <Link
        href="/home"
        onClick={() => handleChange("home")}
        className="cursor-pointer w-[80px] relative group flex flex-col items-center"
      >
        <div
          className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "home" ? activeInterface : ""}`}
        >
          <Image
            className=""
            src={whiteHouse}
            alt="home"
            width={25}
            height={25}
          />
        </div>
      </Link>

      <Link
        href="/transactions"
        onClick={() => handleChange("transactions")}
        className="cursor-pointer w-[80px] relative group flex flex-col items-center"
      >
        <div
          className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "transactions" ? activeInterface : ""}`}
        >
          <Image
            className=""
            src={transactions}
            alt="transactions"
            width={25}
            height={25}
          />
        </div>
      </Link>

      <div
        onClick={() => {
          setType("create");
          setIsOpen(true);
        }}
        className="cursor-pointer w-[80px] flex justify-center items-center"
      >
        <Image className="w-8 h-8" src={add} alt="add" />
      </div>

      <Link
        href="/shared-wallets"
        onClick={() => handleChange("wallets")}
        className="cursor-pointer w-[80px] relative group flex flex-col items-center"
      >
        <div
          className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "wallets" ? activeInterface : ""}`}
        >
          <Image
            className=""
            src={wallets}
            alt="wallets"
            width={25}
            height={25}
          />
        </div>
      </Link>

      <Link
        href="/budgets"
        onClick={() => handleChange("budgets")}
        className="cursor-pointer w-[80px] relative group flex flex-col items-center"
      >
        <div
          className={`relative transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "budgets" ? activeInterface : ""}`}
        >
          <Image
            className=""
            src={budgets}
            alt="budgets"
            width={25}
            height={25}
          />
        </div>
      </Link>
    </div>
  );
};

export default Bottombar;

// <Link
//   href="/notifications"
//   onClick={() => handleChange("notifications")}
//   className="cursor-pointer w-[80px] relative group flex flex-col items-center"
// >
//   <div
//     className={`relative transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "notifications" ? activeInterface : ""}`}
//   >
//     <div
//       className={`absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center bg-red-500 ${pendingNotifications.length <= 0 && "hidden"}`}
//     >
//       <p className="text-[10px]">
//         {pendingNotifications.length > 9
//           ? "9+"
//           : pendingNotifications.length}
//       </p>
//     </div>
//     <Image
//       className=""
//       src={notifications}
//       alt="notifications"
//       width={25}
//       height={25}
//     />
//   </div>
// </Link>

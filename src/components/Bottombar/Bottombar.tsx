"use client";
import whiteHouse from "../../assets/white_home.svg";
import whiteRoutines from "../../assets/white_routines.svg";
import notifications from "@/assets/notification.svg";
import item from "../../assets/white_item.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Bottombar = () => {
  const path = usePathname();
  const modifiedPath = path.split("/")[1].toString();
  const [active, setActive] = useState(path ? modifiedPath : "home");
  const activeInterface = "bg-[#0ea5e9] rounded-lg";

  const handleChange = (current: string) => {
    setActive(current);
  };

  return (
    <div className="w-full flex justify-between items-center bg-gray-800 lg:hidden px-2 h-[50px]">
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
            width={20}
            height={20}
          />
        </div>
      </Link>
      <Link
        href="/routines"
        onClick={() => handleChange("routines")}
        className="cursor-pointer w-[80px] relative group flex flex-col items-center"
      >
        <div
          className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "routines" ? activeInterface : ""}`}
        >
          <Image className="" src={item} alt="home" width={20} height={20} />
        </div>
      </Link>
      {/* <div onClick={() => {}} className="cursor-pointer w-[40px] relative group flex flex-col items-center bg-[#58ed18] rounded-full">
                <div className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center `}>
                    <Image className="" src={whiteCreate} alt="create"  width={20} height={20} />
                </div>
            </div>              */}
      <Link
        href="/plans"
        onClick={() => handleChange("plans")}
        className="cursor-pointer w-[80px] relative group flex flex-col items-center"
      >
        <div
          className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "plans" ? activeInterface : ""}`}
        >
          <Image
            className=""
            src={whiteRoutines}
            alt="routines"
            width={20}
            height={20}
          />
        </div>
      </Link>
      <Link
        href="/notifications"
        onClick={() => handleChange("notifications")}
        className="cursor-pointer w-[80px] relative group flex flex-col items-center"
      >
        <div
          className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "notifications" ? activeInterface : ""}`}
        >
          <Image
            className=""
            src={notifications}
            alt="notifications"
            width={20}
            height={20}
          />
        </div>
      </Link>
    </div>
  );
};

export default Bottombar;


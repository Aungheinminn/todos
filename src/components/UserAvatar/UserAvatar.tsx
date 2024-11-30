"use client";
import { useState } from "react";
import { useCurrentUserStore } from "@/lib/userStore";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logout from "@/assets/signout_black.svg";
import setting from "@/assets/white_setting.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/lib/users.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserAvatar = () => {
  const { currentUser } = useCurrentUserStore((state) => state);
  console.log("currentUser", currentUser);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        router.push("/login");
      }
      return res;
    } catch (e) {
      console.error(e);
    } finally {
      setOpen(!open);
    }
  };
  const handleOpenChange = () => {
    setOpen(!open);
  };
  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        onClick={() => handleOpenChange()}
        className="cursor-pointer"
        asChild
      >
        <Avatar className="cursor-pointer w-8 h-8 flex items-center justify-center bg-white">
          <AvatarFallback className="text-black">
            {currentUser?.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] bg-gray-800 mr-1 p-2 border-2 border-white">
        <Link
          onClick={() => handleOpenChange()}
          href="/settings"
          className="w-full flex items-center gap-x-1 hover:bg-[#0ea5e9] rounded-md p-1 px-2"
        >
          <Image src={setting} alt="setting" />
          <p className="text-white font-medium">Settings</p>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-x-1 hover:bg-[#0ea5e9] rounded-md p-1 px-2"
        >
          <Image src={logout} alt="logout" />
          <p className="text-white font-medium">Logout</p>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;

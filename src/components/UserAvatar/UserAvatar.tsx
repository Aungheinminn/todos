"use client";
import { useState } from "react";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logout from "@/assets/signout.svg";
import setting from "@/assets/white_setting.svg";
import notification from "@/assets/notification.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/lib/services/users.service";
import { useRouter, redirect } from "next/navigation";
import Link from "next/link";
import { useWalletStore } from "@/lib/stores/walletStore";

const UserAvatar = () => {
  const { currentUser } = useCurrentUserStore((state) => state);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        useCurrentUserStore.getState().reset();
        useWalletStore.getState().reset();

        useCurrentUserStore.persist.clearStorage();
        useWalletStore.persist.clearStorage();

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
            {currentUser && currentUser.username
              ? currentUser.username.slice(0, 2).toUpperCase()
              : "NA"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] bg-gray-800 mr-1 p-1 border border-white">
        <Link
          onClick={() => handleOpenChange()}
          href="/settings"
          className="w-full flex items-center gap-x-2 hover:bg-[#0ea5e9] rounded-md p-2"
        >
          <Image src={setting} alt="setting" />
          <p className="text-white font-medium">Settings</p>
        </Link>
        <Link
          href="/requests"
          className="w-full flex items-center gap-x-2 hover:bg-[#0ea5e9] rounded-md p-2"
        >
          <Image src={notification} alt="notificaiton" />
          <p className="text-white font-medium">Requests</p>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-x-2 hover:bg-[#0ea5e9] rounded-md p-2"
        >
          <Image src={logout} alt="logout" />
          <p className="text-white font-medium">Logout</p>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;

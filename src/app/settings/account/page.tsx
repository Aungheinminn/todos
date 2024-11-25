"use client";

import Image from "next/image";
import Link from "next/link";
import back from "@/assets/arrow_left_black.svg";
import { Button } from "@/components/ui/button";

const AccountHeader = () => {
  return (
    <div className="w-full flex justify-start items-center gap-x-2 px-2 py-3 bg-gray-900">
      <Link
        href="/settings"
        className="flex justify-center items-center gap-x-2"
      >
        <Image src={back} alt="back" className="w-4 h-4" />
      </Link>
      <h3 className="text-white">Account</h3>
    </div>
  );
};

const AccountFooter = () => {
  return (
    <div className="w-full flex flex-col gap-y-1 px-2">
      <Button className="w-full bg-red-500">Delete Account</Button>
      <Button className="w-full bg-gray-600">Logout</Button>
    </div>
  );
};

const Account = () => {
  return (
    <div className="w-full">
      <AccountHeader />
      <AccountFooter />
    </div>
  );
};
export default Account;

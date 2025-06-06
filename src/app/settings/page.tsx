"use client";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import Image from "next/image";
import UserProfile from "@/assets/user_profile.svg";
import AccountSettings from "@/assets/account_settings.svg";
import Link from "next/link";
import { Suspense } from "react";
import SettingsLoading from "@/app/settings/loading";

const Settings = () => {
  return (
    <Suspense fallback={<SettingsLoading />}>
    <div className="text-black w-full flex flex-col justify-start items-start gap-y-2">
      <div className="w-full text-start p-3 px-2 bg-gray-800">
        <h3 className="text-white">Settings</h3>
      </div>
      <div className="w-full grid grid-cols-2 px-1 gap-1">
        <Link
          href="/settings/account"
          className="flex h-[100px] flex-col justify-start items-start bg-gray-600 hover:bg-gray-700 rounded-md gap-y-1 text-white p-4 px-2"
        >
          <Image src={AccountSettings} alt="account setting" />
          <p>Account Settings</p>
        </Link>

        <Link
          href="/settings/profile"
          className="flex h-[100px] flex-col justify-start items-start bg-gray-600 hover:bg-gray-700 rounded-md gap-y-1 text-white p-4 px-2"
        >
          <Image src={UserProfile} alt="user profile" />
          <p>User Profile</p>
        </Link>
        <Link
          href=""
          className="flex h-[100px] flex-col justify-start items-start bg-gray-600 hover:bg-gray-700 rounded-md gap-y-1 text-white p-4 px-2"
        >
          <Image src={UserProfile} alt="user profile" />
          <p>Not Yet</p>
        </Link>
        <Link
          href=""
          className="flex h-[100px] flex-col justify-start items-start bg-gray-600 hover:bg-gray-700 rounded-md gap-y-1 text-white p-4 px-2"
        >
          <Image src={UserProfile} alt="user profile" />
          <p>Not Yet</p>
        </Link>
      </div>
    </div>
    </Suspense>
  );
};
export default Settings;

"use client";

import { UserType } from "@/lib/types/user.type";
import Image from "next/image";
import { useState } from "react";
import searchIcon from "@/assets/white_search.svg";
import { Skeleton } from "@/components/ui/skeleton";
import MutateLoading from "@/components/MutateLoading/MutateLoading";

type WalletUserManagementProps = {
  currentUserId: string;
  walletAdminId: string;
  users: UserType[];
  onMakeAdmin: (userId: string) => void;
  isMakeAdminLoading: boolean;
  onLeaveWallet: (userId: string) => void;
  isLeaveWalletLoading: boolean;
  onRemoveUser: (userId: string) => void;
  isRemoveUserLoading: boolean;
  isLoading: boolean;
  totalUsers: number;
  onSearch: (query: string) => void;
};

const WalletUserManagement: React.FC<WalletUserManagementProps> = ({
  currentUserId,
  walletAdminId,
  users,
  onMakeAdmin,
  isMakeAdminLoading,
  onLeaveWallet,
  isLeaveWalletLoading,
  onRemoveUser,
  isRemoveUserLoading,
  isLoading,
  totalUsers,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  console.log(currentUserId, walletAdminId)

  if (isLoading)
    return <Skeleton className="bg-gray-700 w-full px-3 h-[300px]" />;

  return (
    <div className="w-full bg-gray-700/50 text-white rounded-lg p-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          User Management
        </h2>
        <div className="px-4 py-2 bg-gray-700 rounded-full text-sm text-white">
          Total Users: <span className="font-medium">{totalUsers}</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users..."
            className="flex-1 px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
            <Image className="w-4 h-4" src={searchIcon} alt="search" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-700 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-600 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <h3 className="font-medium text-white">
                {user.username}
                <span
                  className={` ${walletAdminId !== user._id && "hidden"} inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-500 text-white ml-2 rounded-full`}
                >
                  Admin
                </span>{" "}
              </h3>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>

            <div
              className={`${user._id === walletAdminId || currentUserId === user._id ? "hidden" : "flex"} gap-2 w-auto`}
            >
              <button
                onClick={() => onMakeAdmin(user._id || "")}
                disabled={isMakeAdminLoading}
                className={`${isMakeAdminLoading && "cursor-not-allowed"} flex-1 sm:flex-none px-4 w-[120px] h-10 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200 whitespace-nowrap`}
              >
                {isMakeAdminLoading ? (
                  <MutateLoading width="120px" height="40px" />
                ) : (
                  "Make Admin"
                )}
              </button>
              <button
                onClick={() => onRemoveUser(user._id || "")}
                disabled={isRemoveUserLoading}
                className={`${isRemoveUserLoading && "cursor-not-allowed"} flex-1 sm:flex-none px-4 h-10 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200`}
              >
                {isRemoveUserLoading ? (
                  <MutateLoading width="91px" height="40px" />
                ) : (
                  "   Remove"
                )}
              </button>
            </div>

            <div
              className={`${user._id === currentUserId ? "flex" : "hidden"} gap-2 w-auto}`}
            >
              <button
                onClick={() => onLeaveWallet(user._id || "")}
                disabled={isLeaveWalletLoading || walletAdminId === currentUserId}
                className={` ${walletAdminId === currentUserId && "cursor-not-allowed"} flex-1 sm:flex-none px-4 h-10 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200`}
              >
                {isLeaveWalletLoading ? (
                  <MutateLoading width="70px" height="40px" />
                ) : (
                  "Leave Wallet"
                )}
              </button>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-12 bg-gray-700 rounded-lg">
            <p className="text-gray-300">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletUserManagement;

"use client";

import { UserType } from "@/lib/types/user.type";
import Image from "next/image";
import { useState } from "react";
import searchIcon from "@/assets/white_search.svg";

type WalletUserManagementProps = {
  users: UserType[];
  onMakeAdmin: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  isLoading: boolean;
  totalUsers: number;
  onSearch: (query: string) => void;
};

const WalletUserManagement: React.FC<WalletUserManagementProps> = ({
  users,
  onMakeAdmin,
  onRemoveUser,
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

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="w-full bg-gray-700/50 text-white rounded-lg p-3 ">
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

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-700 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-600 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <h3 className="font-medium text-white">{user.username}</h3>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => onMakeAdmin(user._id || "")}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Admin
              </button>
              <button
                onClick={() => onRemoveUser(user._id || "")}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Remove
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

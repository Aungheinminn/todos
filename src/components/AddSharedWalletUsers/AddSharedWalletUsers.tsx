"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSharedWalletRequestMutation } from "@/lib/mutations/sharedWalletRequestMutation";
import { getUserByRefId } from "@/lib/services/users.service";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import { SharedWalletRequestType } from "@/lib/types/sharedWalletRequest.type";
import { WalletType } from "@/lib/types/wallet.type";
import { debounce } from "@/lib/utils/debounce";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useMemo } from "react";

type AddSharedWalletUsersProps = {
  children: React.ReactNode;
  wallet: WalletType;
};

type SharedWalletUsersBoxProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sharedWalletUsers: { name: string; id: string; refId: string }[];
  setSharedWalletUsers: React.Dispatch<
    React.SetStateAction<{ name: string; id: string; refId: string }[]>
  >;
};

type UserInfoCardProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setSharedWalletUsers: React.Dispatch<
    React.SetStateAction<{ name: string; id: string; refId: string }[]>
  >;
};

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  isOpen,
  setIsOpen,
  input,
  setInput,
  setSharedWalletUsers,
}) => {
  const { data } = useQuery({
    queryKey: ["userInfo", input],
    queryFn: () => getUserByRefId(input),
    enabled: isOpen,
  });

  const handleSelectUser = () => {
    if (!data.success) return;
    setSharedWalletUsers((prev) => [
      ...prev,
      { name: data.data.username, id: data.data._id, refId: data.data.refId },
    ]);
    setInput("");
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleSelectUser}
      className={`transition-all ${isOpen ? "absolute" : "hidden"} w-full bg-gray-800 p-2 top-14 rounded-md left-0 cursor-pointer border border-transparent hover:border-slate-400 flex justify-start items-center ${input === "" && "hidden"}`}
    >
      {data ? (
        <p className="text-gray-500">
          {data.success ? data.data.username : "User not found"}
        </p>
      ) : (
        <p className="text-gray-500">User not found</p>
      )}
    </div>
  );
};

const SharedWalletUsersBox: React.FC<SharedWalletUsersBoxProps> = ({
  input,
  setInput,
  sharedWalletUsers,
  setSharedWalletUsers,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRemoveSharedUser = (id: string) => {
    setSharedWalletUsers((prev) => prev.filter((u) => u.refId !== id));
  };

  const handleSelecteUser = (value: string) => {
    setInput(value);
    setSharedWalletUsers((prev) => [...prev.filter((u) => u.refId !== value)]);
  };

  const debouncedSetInput = useMemo(
    () => debounce((value: string) => setInput(value), 100),
    [setInput],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSetInput(value);

    setIsOpen(true);
  };

  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-1 p-2">
      <div className="relative w-full flex justify-start items-center border border-slate-400 rounded-md p-1 gap-x-1">
        <input
          type="text"
          className="w-full px-2 h-10 bg-transparent text-white focus:outline-none"
          value={input}
          autoFocus
          onChange={handleChange}
        />
        <UserInfoCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          input={input}
          setInput={setInput}
          setSharedWalletUsers={setSharedWalletUsers}
        />
      </div>
      <div className="w-full flex flex-wrap justify-start gap-1">
        {sharedWalletUsers.map((user, index) => (
          <div
            className="flex justify-start items-center bg-slate-600 rounded-md p-1 gap-x-1"
            key={index}
          >
            <p
              onClick={() => handleSelecteUser(user.refId)}
              className="cursor-pointer max-w-[100px] h-6 truncate"
            >
              {user.name}
            </p>
            <Button
              className="h-6"
              onClick={() => handleRemoveSharedUser(user.refId)}
            >
              x
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddSharedWalletUsers: React.FC<AddSharedWalletUsersProps> = ({
  children,
  wallet,
}) => {
  const { createMutation } = useSharedWalletRequestMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [sharedWalletUsers, setSharedWalletUsers] = useState<
    {
      name: string;
      id: string;
      refId: string;
    }[]
  >([]);

  const handleAddSharedWalletUsers = () => {
    const transformedDatas = sharedWalletUsers.reduce((acc, user) => {
      const data = {
        status: "pending",
        wallet_id: wallet._id || "",
        inviter_id: wallet.user_id,
        invitee_id: user.id,
      };

      acc.push(data);
      return acc;
    }, [] as SharedWalletRequestType[]);

    createMutation.mutate(
      {
        data: transformedDatas,
      },
      {
        onSettled: (data) => {
          if (data.success) {
            setIsOpen(!isOpen);
          }
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={`flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-700/50 hover:bg-blue-600 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}>
        {children}
      </DialogTrigger>
      <DialogContent className="rounded-md bg-gray-700">
        <SharedWalletUsersBox
          input={input}
          setInput={setInput}
          sharedWalletUsers={sharedWalletUsers}
          setSharedWalletUsers={setSharedWalletUsers}
        />
        <Button
          disabled={sharedWalletUsers.length === 0}
          onClick={handleAddSharedWalletUsers}
        >
          Add User
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSharedWalletUsers;

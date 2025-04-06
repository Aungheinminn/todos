"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getUserByRefId } from "@/lib/services/users.service";
import { SharedWalletRequestType } from "@/lib/types/sharedWalletRequest.type";
import { WalletType } from "@/lib/types/wallet.type";
import { debounce } from "@/lib/utils/debounce";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useMemo } from "react";

type AddSharedWalletUsersProps = {
  valid: boolean;
  wallet: WalletType;
};

type SharedWalletUsersBoxProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sharedWalletUsers: { name: string; id: string }[];
  setSharedWalletUsers: React.Dispatch<React.SetStateAction<{ name: string; id: string }[]>>;
};

type UserInfoCardProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  input: string;
  setSharedWalletUsers: React.Dispatch<React.SetStateAction<{ name: string; id: string }[]>>;
};

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  isOpen,
  setIsOpen,
  input,
  setSharedWalletUsers,
}) => {
  const { data } = useQuery({
    queryKey: ["userInfo", input],
    queryFn: () => getUserByRefId(input),
    enabled: isOpen,
  });

  const handleSelectUser = () => {
    if (!data.success) return;
    setSharedWalletUsers((prev) => [...prev, data]);
    setIsOpen(false);
  };

  return  (
    <div
      onClick={handleSelectUser}
      className={`transition-all ${isOpen ? "absolute" : "hidden"} w-full bg-gray-800 p-2 top-14 rounded-md left-0 cursor-pointer border border-transparent hover:border-slate-400 flex justify-start items-center ${input === "" && "hidden"}`}
    >
      {data ? 
      <p className="text-gray-500">{data.success ? "hi" : "User not found"}</p> : 
<p className="text-gray-500">User not found</p>
      }
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

  const [text, setText] = useState<string>(input);

  const handleRemoveSharedUser = (id: string) => {
    setSharedWalletUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSelecteUser = (value: string) => {
    setInput(value);
    setSharedWalletUsers((prev) => [...prev.filter((u) => u.id !== value)]);
  };

  const debouncedSetInput = useMemo(
    () => debounce((value: string) => setInput(value), 100),
    [setInput],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    debouncedSetInput(value);

    setIsOpen(true);
  };

  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-1 p-2">
      <div className="relative w-full flex justify-start items-center border border-slate-400 rounded-md p-1 gap-x-1">
        <input
          type="text"
          className="w-full h-10 bg-transparent text-white focus:outline-none"
          value={text}
          autoFocus
          onChange={handleChange}
        />
        <UserInfoCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          input={input}
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
              onClick={() => handleSelecteUser(user.id)}
              className="cursor-pointer max-w-[100px] h-6 truncate"
            >
              {user.name}
            </p>
            <Button
              className="h-6"
              onClick={() => handleRemoveSharedUser(user.id)}
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
  valid,
  wallet,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [sharedWalletUsers, setSharedWalletUsers] = useState<{
    name: string;
    id: string;
  }[]>([]);

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

    console.log(transformedDatas);
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={`${valid ? "" : "pointer-events-none opacity-50"}`}
      >
        Open
      </DialogTrigger>
      <DialogContent className="rounded-md bg-gray-700">
        <SharedWalletUsersBox
          input={input}
          setInput={setInput}
          sharedWalletUsers={sharedWalletUsers}
          setSharedWalletUsers={setSharedWalletUsers}
        />
        <Button onClick={handleAddSharedWalletUsers}>Add</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSharedWalletUsers;

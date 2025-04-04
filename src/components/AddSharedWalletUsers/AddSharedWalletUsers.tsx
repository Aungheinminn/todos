"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SharedWalletRequestType } from "@/lib/types/sharedWalletRequest.type";
import { WalletType } from "@/lib/types/wallet.type";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";

type AddSharedWalletUsersProps = {
  valid: boolean;
  wallet: WalletType;
};

type SharedWalletUsersBoxProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sharedWalletUsers: string[];
  setSharedWalletUsers: React.Dispatch<React.SetStateAction<string[]>>;
};

const SharedWalletUsersBox: React.FC<SharedWalletUsersBoxProps> = ({
  input,
  setInput,
  sharedWalletUsers,
  setSharedWalletUsers,
}) => {
  const handleAddSharedUser = () => {
    setSharedWalletUsers((prev) => [...prev, input]);
    setInput("");
  };

  const handleRemoveSharedUser = (user: string) => {
    setSharedWalletUsers((prev) => prev.filter((u) => u !== user));
  };

  const handleSelecteUser = (value: string) => {
    setInput(value);
    setSharedWalletUsers((prev) => [...prev.filter((u) => u !== value)]);
  };

  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-1 p-2">
      <div className="w-full flex justify-start items-center border border-slate-400 rounded-md p-1 gap-x-1">
        <input
          type="text"
          className="w-full h-10 bg-transparent text-white focus:outline-none"
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSharedUser()}
        />
        <Button className="" onClick={handleAddSharedUser}>
          +
        </Button>
      </div>
      <div className="w-full flex flex-wrap justify-start gap-1">
        {sharedWalletUsers.map((user, index) => (
          <div
            className="flex justify-start items-center bg-slate-600 rounded-md p-1 gap-x-1"
            key={index}
          >
            <p
              onClick={() => handleSelecteUser(user)}
              className="cursor-pointer max-w-[100px] h-6 truncate"
            >
              {user}
            </p>
            <Button
              className="h-6"
              onClick={() => handleRemoveSharedUser(user)}
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
  const [sharedWalletUsers, setSharedWalletUsers] = useState<string[]>([]);

  const handleAddSharedWalletUsers = () => {
    const transformedDatas = sharedWalletUsers.reduce((acc, user) => {
      const data = {
        status: "pending",
        wallet_id: wallet._id || "",
        inviter_id: wallet.user_id,
        invitee_id: user,
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

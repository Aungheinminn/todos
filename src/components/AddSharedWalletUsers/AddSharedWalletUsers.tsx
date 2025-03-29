"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";

type AddSharedWalletUsersProps = {
  valid: boolean;
  sharedWalletUsers: string[];
  setSharedWalletUsers: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddSharedWalletUsers: () => void;
};

type SharedWalletUsersBoxProps = {
  sharedWalletUsers: string[];
  setSharedWalletUsers: React.Dispatch<React.SetStateAction<string[]>>;
};

const SharedWalletUsersBox: React.FC<SharedWalletUsersBoxProps> = ({
  sharedWalletUsers,
  setSharedWalletUsers,
}) => {
  const [input, setInput] = useState<string>("");
  const handleAddSharedUser = () => {
    setSharedWalletUsers((prev) => [...prev, input]);
    setInput("");
  };

  const handleRemoveSharedUser = (user: string) => {
    setSharedWalletUsers((prev) => prev.filter((u) => u !== user));
  };
  return (
    <div className="w-full box-border flex flex-col justify-center items-center gap-y-1 p-2">
      <div className="w-full flex justify-start items-center">
        <input
          type="text"
          className="w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleAddSharedUser}>add</Button>
      </div>
      <div className="w-full flex flex-wrap justify-start gap-1">
        {sharedWalletUsers.map((user, index) => (
          <div key={index}>
            <p className="w-[50px] truncate">{user}</p>
            <Button
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
  sharedWalletUsers,
  setSharedWalletUsers,
  handleAddSharedWalletUsers,
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`${valid ? "" : "pointer-events-none opacity-50"}`}
      >
        Open
      </DialogTrigger>
      <DialogContent>
        <SharedWalletUsersBox
          sharedWalletUsers={sharedWalletUsers}
          setSharedWalletUsers={setSharedWalletUsers}
        />
        <Button onClick={handleAddSharedWalletUsers}>Add</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSharedWalletUsers;

"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import Link from "next/link";
import back from "@/assets/arrow_left_black.svg";
import { Button } from "@/components/ui/button";
import AccountSwitcher from "@/components/AccountSwitcher/AccountSwitcher";
import { useCurrentUserStore } from "@/lib/userStore";
import { getCurrentUser } from "@/lib/users.service";
import { UserType } from "@/lib/types/user.type";
import { getLinkedUsers } from "@/lib/linkedUsers.service";
import { AccountMutationProvider } from "./accountMutationProvider";

const useLinkingInfo = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  return {
    open,
    setOpen,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
  };
};

const AccountHeader = () => {
  return (
    <div className="w-full flex justify-start items-center gap-x-2 px-2 py-3 bg-gray-800">
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
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );
  const { createMutation, declineMutation, acceptMutation } =
    AccountMutationProvider();

  const {
    open,
    setOpen,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
  } = useLinkingInfo();
  useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });

  const { data: linkedUsers } = useQuery({
    queryKey: ["linkedUsers"],
    queryFn: () => getLinkedUsers(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

  const handleLinking = async (id: string, email: string, password: string) => {
    try {
      createMutation.mutate(
        { id: id, email: email, password: password },
        {
          onError: (error: any) => {
            console.log(error);
          },
          onSuccess: (data) => {
            if (data.success) {
              setEmail("");
              setPassword("");
              setOpen(false);
            } else {
              setErrorMessage(data.message);
            }
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log("currentUser", currentUser);
  return (
    <div className="w-full">
      <AccountHeader />
      <AccountSwitcher
        open={open}
        setOpen={setOpen}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        handleLinking={handleLinking}
        currentUser={currentUser}
        addedUsers={linkedUsers}
      />
      <AccountFooter />
    </div>
  );
};
export default Account;

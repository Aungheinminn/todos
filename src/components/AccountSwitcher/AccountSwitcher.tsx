"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/lib/types/user.type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import addIcon from "@/assets/filled_plus.svg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { postLinkedUser } from "@/lib/linkedUsers.service";

type AccountSwitcherProps = {
  currentUser: UserType | null;
  addedUsers: [];
};

type AddUserProps = {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPasswod: React.Dispatch<React.SetStateAction<string>>;
  handleAddUser: () => void;
};

const AddUserUi: React.FC<AddUserProps> = ({
  email,
  password,
  setEmail,
  setPasswod,
  handleAddUser,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-[150px] cursor-pointer flex items-center gap-x-2">
          <Image className="w-8 h-8" src={addIcon} alt="add icon" />
          <p>Add an account</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle>Add an account</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-y-2">
            <div className="w-full flex flex-col gap-y-1">
              <p className="text-white">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full focus:outline-none text-white bg-transparent border border-white rounded-md px-2 py-1"
                value={email}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <p className="text-white">Password</p>
              <input
                onChange={(e) => setPasswod(e.target.value)}
                className="w-full focus:outline-none text-white bg-transparent border border-white rounded-md px-2 py-1"
                value={password}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
              />
            </div>
            <p
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-sky-500"
            >
              {showPassword ? "Hide password" : "Show password"}
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex justify-center items-center">
          <AlertDialogCancel className="w-1/2 text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAddUser} className="w-1/2">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  currentUser,
  addedUsers,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleAddUser = async () => {
    const res = await postLinkedUser(
      { email: email, password: password },
      currentUser?._id ?? "",
    );
    console.log("blah", email, password);
    setEmail("");
    setPassword("");
  };
  if (currentUser === null) return <></>;
  return (
    <Accordion type="single" collapsible className="w-full p-2 rounded-lg">
      <AccordionItem
        className="w-full bg-gray-700 p-2 rounded-lg gap-y-2"
        value="item-1"
      >
        <AccordionTrigger className="hover:no-underline bg-gray-800 rounded-lg px-4">
          <div className="flex items-center gap-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser.icon ?? ""} alt="@shadcn" />
              <AvatarFallback className="text-black">
                {currentUser.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p>{currentUser.username}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-y-2 mt-3 pb-2 px-2">
          {addedUsers
            ? addedUsers.map((user) => {
                return <p key="a">asf</p>;
              })
            : ""}
          <AddUserUi
            email={email}
            password={password}
            setEmail={setEmail}
            setPasswod={setPassword}
            handleAddUser={handleAddUser}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccountSwitcher;

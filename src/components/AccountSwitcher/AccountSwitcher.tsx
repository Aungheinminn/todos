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
  open: boolean;
  email: string;
  password: string;
  errorMessage: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPasswod: React.Dispatch<React.SetStateAction<string>>;
  handleAddUser: () => void;
};

const AddUserUi: React.FC<AddUserProps> = ({
  open,
  email,
  password,
  errorMessage,
  setOpen,
  setEmail,
  setPasswod,
  handleAddUser,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger onClick={() => setOpen(true)} asChild>
        <div className="w-[150px] cursor-pointer flex items-center gap-x-2">
          <Image className="w-8 h-8" src={addIcon} alt="add icon" />
          <p>Link an account</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] md:w-full bg-gray-700 rounded-lg">
        <AlertDialogHeader className="w-full flex flex-col items-start">
          <AlertDialogTitle>Link an account</AlertDialogTitle>
          <div className="w-full flex flex-col  gap-y-2">
            <div className="w-full flex flex-col items-start gap-y-1">
              <span className="text-white">Email</span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black focus:outline-none bg-white border border-white rounded-md px-2 py-1"
                value={email}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="w-full flex flex-col items-start gap-y-1">
              <span className="text-white">Password</span>
              <input
                onChange={(e) => setPasswod(e.target.value)}
                className="w-full text-black focus:outline-none bg-white border border-white rounded-md px-2 py-1"
                value={password}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
              />
            </div>
            <p
              onClick={() => setShowPassword(!showPassword)}
              className="w-full text-start cursor-pointer text-sky-500"
            >
              {showPassword ? "Hide password" : "Show password"}
            </p>
            <p
              className="w-full text-start cursor-pointer text-red-500"
            >
              {errorMessage}
            </p>
          </div>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-x-2">
          <AlertDialogCancel className="m-0 p-0 w-1/2 h-9 text-black" onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Button className="m-0 p-0 w-1/2 h-9" onClick={handleAddUser}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  currentUser,
  addedUsers,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleAddUser = async () => {
    try {
      const res = await postLinkedUser(
        { email: email, password: password },
        currentUser?._id ?? "",
      );
      if (!res.success) {
        setOpen(true);
        console.log(res.message);
        setErrorMessage(res.message);
      } else {
        setOpen(false);
      }
    } catch (e) {
      setOpen(true);
      setErrorMessage("Something went wrong");
      console.log(e);
    } finally {
      console.log("blah", email, password);
      setEmail("");
      setPassword("");
    }
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
            open={open}
            email={email}
            password={password}
            errorMessage={errorMessage}
            setOpen={setOpen}
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

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

type AccountSwitcherProps = {
  currentUser: UserType | null;
  addedUsers: [];
};
const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  currentUser,
  addedUsers,
}) => {
  if(currentUser === null) return <></>
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
          <div className="w-[130px] cursor-pointer flex items-center gap-x-2">
            <Image className="w-8 h-8" src={addIcon} alt="add icon" />
            <p>Add account</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccountSwitcher;

import { UserType } from "@/lib/types/user.type";
import UserAvatar from "../UserAvatar/UserAvatar";
type MobileNavbarProps = {
  currentUser?: UserType | null;
  onToggle: () => void;
};

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  currentUser,
  onToggle,
}) => {
  return (
    <div className="w-full bg-gray-800 flex justify-between items-center lg:hidden px-2 py-3">
      <h1 className="">Logo</h1>
      <UserAvatar />
    </div>
  );
};

export const WebNavbar = () => {
  return (
    <div className="w-full flex justify-between items-center hidden lg:flex">
      <h1>Logo</h1>
      <UserAvatar />
    </div>
  );
};

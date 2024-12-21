import Image from "next/image";
import moreIcon from "@/assets/white_more.svg";
import deleteIcon from "@/assets/remove.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NotificationPopover = ({
  handleDeleteNotification,
}: {
  handleDeleteNotification: () => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger className="transition-all duration-75 rounded-md hover:border hover:border-[#FFFFFF]" asChild>
        <Image alt="more" className={`w-8 h-8 cursor-pointer`} src={moreIcon} />
      </PopoverTrigger>
      <PopoverContent className="w-full bg-gray-400 px-1 p-0">
        <div
          onClick={handleDeleteNotification}
          className="cursor-pointer flex justify-start items-center gap-x-3 w-full hover:bg-[#E7E5E4] rounded-md p-2"
        >
          <Image src={deleteIcon} alt="delete" />
          <p className="text-sm ont-medium">Delete</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;

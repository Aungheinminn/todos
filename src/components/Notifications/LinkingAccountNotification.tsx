"use client";
import { NotificationType } from "@/lib/types/notification.type";
import { Button } from "../ui/button";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import NotificationStatus from "../NotificationStatus/NotificationStatus";
import NotificationPopover from "../NotificationPopover/NotificationPopover";

const LinkingAccountNotification = ({
  handleDeleteNotification,
  notification,
}: {
  handleDeleteNotification: (id: string) => void;
  notification: NotificationType;
}) => {
  const handleDelete = async () => {
    handleDeleteNotification(notification._id || "");
  }
  return (
    <Link
      href={`/settings/account`}
      key={notification._id}
      className="w-full flex flex-col justify-start bg-gray-400 py-2 px-3 gap-2 rounded-lg border-2 border-gray-400 hover:border-[#0ea5e9]"
    >
      <div className="w-full flex justify-between items-center">
      <div className="w-full flex justify-start gap-x-2">
        <div className="flex shrink-0 justify-center items-center text-white bg-gray-600 h-12 w-12 rounded-full">
          <p>
            {notification.from.username &&
              notification.from.username.slice(0, 2)}
          </p>
        </div>
        <p className="max-w-[80%] text-black line-clamp-2 overflow-y-hidden">
          {notification.content.message}
        </p>
      </div>
      <div onClick={(e) => e.preventDefault()}>
      <NotificationPopover handleDeleteNotification={handleDelete} />
      </div>
      </div>
      <NotificationStatus status={notification.status} />
    </Link>
  );
};

export default LinkingAccountNotification;

// <div className="flex justify-start items-center gap-x-1">
//   <span
//     className={`w-2 h-2 rounded-full ${time === "just now" ? "bg-green-400" : "bg-gray-600"}`}
//   ></span>
//   <p
//     className={`text-xs ${time === "just now" ? "text-green-400" : "text-gray-800"} `}
//   >
//     {time}
//   </p>
// </div>

// <div className="flex justify-center items-center gap-x-2 ">
//   <Button className="bg-sky-500 px-6">Accept</Button>
//   <Button className="px-6">Decline</Button>
// </div>

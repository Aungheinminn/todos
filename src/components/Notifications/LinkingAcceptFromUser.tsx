"use client";
import { NotificationType } from "@/lib/types/notification.type";
import { Button } from "../ui/button";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import NotificationStatus from "../NotificationStatus/NotificationStatus";
import NotificationPopover from "../NotificationPopover/NotificationPopover";

const LinkingAcceptFromUser = ({
  handleDeleteNotification,
  notification,
}: {
  handleDeleteNotification: (id: string) => void;
  notification: NotificationType;
}) => {
  const handleDelete = async () => {
    handleDeleteNotification(notification._id || "");
  };
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
              {notification.to.username && notification.to.username.slice(0, 2)}
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
      <NotificationStatus status={notification.status} notiStatus={notification.notiStatus} />
    </Link>
  );
};

export default LinkingAcceptFromUser;

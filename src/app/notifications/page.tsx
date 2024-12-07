"use client";
import { getCurrentUser } from "@/lib/users.service";
import { useQuery, useQueryClient } from "react-query";
import { useCurrentUserStore } from "@/lib/userStore";
import { useEffect } from "react";
import { Socket } from "@/lib/singleton/socketService";
import { useNotificationStore } from "@/lib/notificationStore";
import {
  getUnseenNotifications,
  markAllAsSeen,
} from "@/lib/notifications.service";
import NoticationsHandler from "@/components/NotificationsHandler/NotificationsHandler";

const Notifications = () => {
  const queryClient = useQueryClient();
  const socketIo = Socket.getInstance();
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );

  const { resetPendingNotifications } = useNotificationStore((state) => state);

  useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });

  const { data: notifications, isLoading: isNotificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => markAllAsSeen(currentUser?._id || ""),
    enabled: !!currentUser?._id,
    onSuccess: () => {
      resetPendingNotifications();
    },
  });
  console.log("notifications", notifications);

  useEffect(() => {
    socketIo.connect("notification");
    socketIo.join(currentUser?._id || "");
    socketIo.getNotifications();

    return () => {
      socketIo.disconnect();
    };
  }, []);
  return (
    <div>
      <div className="w-full text-start p-3 px-2 bg-gray-800">
        <h3 className="text-white">Notifications</h3>
      </div>

      <NoticationsHandler notifications={notifications} />
    </div>
  );
};

export default Notifications;

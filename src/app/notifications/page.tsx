"use client";
import { getCurrentUser } from "@/lib/users.service";
import { useQuery, useQueryClient } from "react-query";
import { useCurrentUserStore } from "@/lib/userStore";
import { useState, useEffect } from "react";
import { Socket } from "@/lib/singleton/socketService";
import { useNotificationStore } from "@/lib/notificationStore";
import { markAllAsSeen } from "@/lib/notifications.service";
import NoticationsHandler from "@/components/NotificationsHandler/NotificationsHandler";
import { NotificationMutationProvider } from "./notificationMutation";

const Notifications = () => {
  const queryClient = useQueryClient();
  const socketIo = Socket.getInstance();
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );
  const { resetPendingNotifications } = useNotificationStore((state) => state);

  const { deleteMutation } = NotificationMutationProvider();

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

  const handleDeleteNotification = async (id: string) => {
    try {
      deleteMutation.mutate(id);
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  }
  useEffect(() => {
    socketIo.connect("notification");
    socketIo.join(currentUser?._id || "");
    socketIo.getNotifications((data: any) => {
      console.log("getNotifications in noti", data);
      if (data) {
        queryClient.setQueryData("notifications", (old: any) => [data, ...old]);
      }
    }, "notification page");

    return () => {
      socketIo.socket.off("notifications");
      socketIo.disconnect();
    };
  }, [currentUser]);
  return (
    <div className="">
      <div className="w-full text-start p-3 px-2 bg-gray-800">
        <h3 className="text-white">Notifications</h3>
      </div>

      <NoticationsHandler notifications={notifications} />
    </div>
  );
};

export default Notifications;

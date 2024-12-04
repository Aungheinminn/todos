"use client";
import { getCurrentUser } from "@/lib/users.service";
import { useQuery } from "react-query";
import { useCurrentUserStore } from "@/lib/userStore";
import { useEffect } from "react";
import { Socket } from "@/lib/singleton/socketService";

const Notifications = () => {
  const socketIo = Socket.getInstance();
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );

  useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });

  useEffect(() => {
    socketIo.connect("notification");
    socketIo.join(currentUser?._id || "");
    socketIo.getNotifications();
  }, [currentUser]);
  return (
    <div>
      <div className="w-full text-start p-3 px-2 bg-gray-800">
        <h3 className="text-white">Notifications</h3>
      </div>
    </div>
  );
};

export default Notifications;

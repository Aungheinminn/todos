"use client";
import { getCurrentUser } from "@/lib/users.service";
import { useQuery } from "react-query";
import { useCurrentUserStore } from "@/lib/userStore";
import { useEffect } from "react";
import { io } from "socket.io-client";

const Notifications = () => {
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );

  useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });

  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log("socket is connected");
    });

    socket.on("hey", (data) => {
      console.log(data);
    });

    socket.on("notification", ({ content, to }) => {
      if (currentUser?._id === to) {
        console.log("content", content);
        alert(content);
      } else {
        console.log("not for me");
      }
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
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

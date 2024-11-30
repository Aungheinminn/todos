"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";

const Notifications = () => {
  useEffect(() => {
    const socket = io();
    socket.on("connect", () => {
      console.log("socket is connected");
    });

    socket.on("plans", (data) => {
      console.log(data, "data");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);
  return (
    <div>
      <div className="w-full text-start p-3 px-2 bg-gray-800">
        <h3 className="text-white">Notifications</h3>
      </div>
    </div>
  );
};

export default Notifications;

import { io } from "socket.io-client";

export class Socket {
  private static instance: any;
  private socket: any;

  private constructor() {
    this.socket = io();
  }

  public static getInstance() {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    } else {
      return Socket.instance;
    }
  }

  connect(name: string) {
    this.socket.on("connect", () => {
      console.log(name, "socket is connected");
    });
  }

  join(channel: string) {
    console.log("join", channel);
    this.socket.emit("join", channel);
  }

  getNotifications(callback: (data: any) => void, channel?: string) {
    this.socket.on("notifications", (data: any) => {
      console.log(`Notification received: from ${channel}`, data);
      callback(data);
    });
  }

  getLinkingStatus(callback: (data: any) => void) {
    this.socket.on("linkingStatus", (data: any) => {
      console.log("Notification received:", data);
      callback(data);
    });
  }

  disconnect() {
    this.socket.on("disconnect", () => {
      console.log("socket is disconnected");
    });
  }
}

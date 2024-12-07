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
    this.socket.emit("join", channel);
  }

  getNotifications() {
    this.socket.on("notifications", (data) => {
      console.log(data);
    });
  }

  disconnect() {
    this.socket.on("disconnect", () => {
      console.log("socket is disconnected");
    });
  }
}

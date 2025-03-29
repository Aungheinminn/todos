import { io } from "socket.io-client";

export class Socket {
  private static instance: any;
  private socket: any;

  private constructor() {
    if (Socket.instance) {
      throw new Error(
        "Singleton is limited to one instance. Use getInstance instead",
      );
    }
    this.socket = io({
      autoConnect: false,
    });
  }

  public static getInstance() {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }
    return Socket.instance;
  }

  public connect(id: string) {
    this.socket.auth = {
      id,
    };
    this.socket.connect();
  }

  public receive(wallet_id: string) {
    this.socket.on(wallet_id, (data: any) => {
      console.log(wallet_id, data, "socket data");
    });
  }

  public emit(name: string, data: any) {
    this.socket.emit(name, {
      to: name,
      data,
    });
  }

  public disconnect() {
    this.socket.on("disconnect", () => {
      console.log("socket is disconnected");
    });
  }
}

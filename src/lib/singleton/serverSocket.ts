import { Server } from "socket.io";

export class ServerSocket {
  private static instance: ServerSocket;
  private static socket: Server;

  private constructor() {}

  private static middleware(socket, next) {
    const authGuard = socket.handshake.auth.id;
    if (!authGuard) {
      return next(new Error("Authentication error"));
    }
    next();
  }

  public static getInstance() {
    if (!ServerSocket.instance) {
      ServerSocket.instance = new ServerSocket();
    }
    return ServerSocket.instance;
  }

  public static init(server: any) {
    this.socket = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
  }

  public static connect() {
    this.socket.use(this.middleware).on("connection", (socket) => {
      console.log("Client connected:", socket.id);
      socket.onAny((event, ...args) => {
        console.log(event, args);
      });

      socket.on("join", (data) => {
        console.log(data);
        socket.join(data);
      });

      socket.on("disconnect", () => {
        console.log("socket is disconnected");
      });
    });
  }

  public static emit(name: string, data: any) {
    this.socket.to(name).emit(data);
  }
}

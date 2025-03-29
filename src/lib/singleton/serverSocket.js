import { Server } from "socket.io";

export class ServerSocket {
  static instance;
  static socket;

  constructor() {}

  static middleware(socket, next) {
    const authGuard = socket.handshake.auth.id;
    if (!authGuard) {
      return next(new Error("Authentication error"));
    }
    next();
  }

  static getInstance() {
    if (!ServerSocket.instance) {
      ServerSocket.instance = new ServerSocket();
    }
    return ServerSocket.instance;
  }

  static init(server) {
    this.socket = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
  }

  static connect() {
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

  static emit(name, data) {
    this.socket.to(name).emit(data);
  }
}

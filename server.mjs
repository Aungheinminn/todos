import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Make io accessible globally
  global.io = io;

  io.use((socket, next) => {
    const authGuard = socket.handshake.auth.id;
    if (!authGuard) {
      return next(new Error("Authentication Error"));
    }
    next();
  }).on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on("join", (userId) => {
      console.log("joined", "userId", userId);
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
  console.log("it started");

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

import { createServer } from "node:http";
import next from "next";
import SocketService from "./src/lib/singleton/serverSocket"
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  SocketService.getInstance().init(httpServer);
  SocketService.getInstance().connect();

  console.log("it started");
  // Make io accessible globally

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

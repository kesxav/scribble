import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log(socket);
});

httpServer.listen(3000, () => {
  console.log("hello");
});

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import registerSocket from "./socket.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

registerSocket(io);

server.listen(5001, () => {
  console.log("Server running on 5000");
});

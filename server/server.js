import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let players = {};

console.log(players);
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("chat", (data) => {
    socket.broadcast.emit("chat", data);
  });

  socket.on("addName", (name) => {
    players[socket.id] = {
      userId: socket.id,
      username: name,
      score: 0,
      isDrawer: false,
    };
    console.log(players);

    socket.emit("PlayerAdded", players[socket.id].username);
  });
});

httpServer.listen(3001);

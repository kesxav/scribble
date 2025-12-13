import { createServer } from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const rooms = {};

function createRoom(roomId) {
  rooms[roomId] = {
    id: roomId,
    players: [],
    currentDrawerIndex: 0,
    round: 1,
    timer: null,
  };
}

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
  //Create Room
  socket.on("create-room", () => {
    const roomId = nanoid(6);
    createRoom(roomId);
    console.log(rooms[roomId].players.id);

    socket.emit("room-created", roomId);
  });

  //Join Room
  socket.on("join-room", ({ roomId, name }) => {
    console.log(roomId, name);
    if (!rooms[roomId]) return;

    socket.join(roomId);

    rooms[roomId].players.push({
      id: socket.id,
      name: name?.trim() || "Player",
    });

    console.log(rooms[roomId].players);

    io.to(roomId).emit("players-update", rooms[roomId].players);
  });

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("chat", (data) => {
    socket.broadcast.emit("chat", data);
  });
});

httpServer.listen(3001);

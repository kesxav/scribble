import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("chat", (data) => {
    socket.broadcast.emit("chat", data);
  });

  socket.on("name", (data) => {
    io.emit("name", data);
    console.log(data);
  });
});

httpServer.listen(3001);

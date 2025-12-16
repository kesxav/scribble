import rooms from "./game/room.js";

// function createRoom(roomId) {
//   rooms[roomId] = {
//     players: [],
//     drawerIndex: 0,
//     currentWord: "",
//     round: 1,
//     maxRounds: 3,
//     timeLeft: 60,
//     strokes: [],
//     timer: null,
//     hints: 2,
//   };
// }
const strokes = {};

export default function registerSocket(io) {
  io.on("connection", (socket) => {
    console.log("User:", socket.id);

    // socket.on("room-created", (roomId) => {
    //   // createRoom(roomId);
    // });

    //Room-Join
    socket.on("join-room", ({ roomId, player }) => {
      const room = rooms[roomId];
      if (!room) return;

      const { playerId, name } = player;

      room.players.push({
        playerId,
        socketId: socket.id,
        playerName: name?.trim() || "Player",
        score: 1,
        isDrawer: false,
      });

      socket.join(roomId);

      strokes[roomId] = {
        strokes: [],
      };

      socket.emit("stroke:init", strokes[roomId]);

      const playersNames = rooms[roomId].players.map((p) => p.playerName);

      io.to(roomId).emit("players-update", { roomId, playersNames });
    });

    socket.on("get-players", (roomId) => {
      const playersNames =
        rooms[roomId]?.players?.map((p) => p.playerName) || [];

      io.emit("players-update", { playersNames, roomId });
    });

    socket.on("stroke:add", ({ roomId, stroke }) => {
      if (!strokes[roomId]) return;

      console.log(roomId, stroke);

      strokes[roomId].strokes.push(stroke);

      io.to(roomId).emit("stroke:add", stroke);
    });

    socket.on("stroke:undo", ({ roomId }) => {
      if (!strokes[roomId]) return;

      strokes[roomId].strokes.pop();

      io.to(roomId).emit("stroke:undo");
    });

    socket.on("stroke:clear", ({ roomId }) => {
      if (!strokes[roomId]) return;

      strokes[roomId].strokes = [];

      io.to(roomId).emit("stroke:clear");
    });

    socket.on("round:start", (roomId) => {
      const room = rooms[roomId];

      const drawer = room.players[room.drawerIndex];

      io.to(roomId).emit("round:started", drawer);
    });

    socket.on("chat", (data) => {
      socket.broadcast.emit("chat", data);
    });
  });
}

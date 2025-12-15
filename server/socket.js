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

      const exists = room.players.some((p) => p.socketId === socket.id);

      if (exists) {
        console.log("Duplicate Join Prevented");
      }
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

      socket.emit("strokes:init", strokes[roomId]);

      const playersNames = rooms[roomId].players.map((p) => p.playerName);

      io.to(roomId).emit("players-update", playersNames);
    });

    socket.on("stroke:add", ({ roomId, stroke }) => {
      if (!strokes[roomId]) return;

      console.log(roomId);

      strokes[roomId].strokes.push(stroke);

      io.to(roomId).emit("strokes:add", stroke);
    });

    socket.on("stroke:undo", ({ roomId }) => {
      if (!strokes[roomId]) return;

      strokes[roomId].strokes.pop();

      io.to(roomId).emit("strokes:undo", roomId);
    });

    socket.on("stroke:undo", ({ roomId }) => {
      if (!strokes[roomId]) return;

      strokes[roomId].strokes = [];

      io.to(roomId).emit("strokes:clear");
    });
  });
}

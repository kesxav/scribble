let rooms = {};

function createRoom(roomId) {
  rooms[roomId] = {
    players: [],
    drawerIndex: 0,
    currentWord: "",
    round: 1,
    maxRounds: 3,
    timeLeft: 60,
    strokes: [],
    timer: null,
    hints: 2,
  };
}

export default function registerSocket(io) {
  io.on("connection", (socket) => {
    console.log("User:", socket.id);

    socket.on("room-created", (roomId) => {
      createRoom(roomId);
    });

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

      const playersNames = rooms[roomId].players.map((p) => p.playerName);

      io.to(roomId).emit("players-update", playersNames);
    });
  });
}

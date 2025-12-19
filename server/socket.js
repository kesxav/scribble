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

const WORDS = [
  "Apple",
  "Orange",
  "Pineapple",
  "Banana",
  "Guava",
  "Truck",
  "Car",
];

function getRandomWord(count) {
  const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function rotateDrawer(room) {
  room.drawerIndex = (room.drawerIndex + 1) % room.players.length;
}

function startRound(io, roomId) {
  const room = rooms[roomId];

  // if (room.timer) {
  //   clearInterval(room.timer);
  //   room.timer = null;
  // }
  if (room.round > room.rounds) {
    room.phase = "ended";
    io.to(roomId).emit("gameEnded");
    return;
  }

  room.phase = "wordChoice";
  room.currentWord = null;
  room.players.forEach((player) => {
    player.hasGuessed = false;
  });
  room.wordChoices = getRandomWord(room.words);

  const drawer = room.players[room.drawerIndex];

  io.to(roomId).emit("round:started", {
    round: room.round,
    drawerId: drawer,
    wordChoices: room.wordChoices,
  });
}

function endRound(io, roomId, reason) {
  const room = rooms[roomId];
  if (!room) return;

  clearInterval(room.timer);

  io.to(roomId).emit("round:ended", {
    word: room.currentWord,
    reason: reason,
  });

  room.round++;
  rotateDrawer(room);

  setTimeout(() => {
    strokes[roomId].strokes = [];
    io.to(roomId).emit("stroke:clear");
    startRound(io, roomId);
  }, 5000);
}

function restartGame(io, roomId) {
  const room = rooms[roomId];
  if (!room) return;

  room.round = 1;
  room.drawerIndex = 0;
  room.phase = "waiting";
  room.currentWord = null;

  room.players.forEach((p) => {
    p.score = 0;
    p.hasGuessed = false;
  });
  io.to(roomId).emit("game:restarted");

  startRound(io, roomId);
}

export default function registerSocket(io) {
  io.on("connection", (socket) => {
    console.log("User:", socket.id);

    socket.on("game:restart", ({ roomId }) => {
      const room = rooms[roomId];
      if (!room) return;
      const player = room.players.find((p) => p.socketId === socket.id);

      if (!player?.isHost) return;

      restartGame(io, roomId);
    });

    // socket.on("room-created", (roomId) => {
    //   // createRoom(roomId);
    // });

    //Room-Join
    socket.on("join-room", ({ roomId, player }) => {
      const room = rooms[roomId];
      if (!room) return;

      const { playerId, name } = player;

      if (room.players.length === 0) {
        room.players.push({
          playerId,
          isHost: true,
          socketId: socket.id,
          playerName: name?.trim() || "Player",
          score: 1,
          hadGuessed: false,
        });
      } else {
        room.players.push({
          playerId,
          isHost: false,
          socketId: socket.id,
          playerName: name?.trim() || "Player",
          score: 1,
          hadGuessed: false,
        });
      }

      console.log(room.players);

      socket.join(roomId);
      if (!strokes[roomId]) {
        strokes[roomId] = {
          strokes: [],
        };
      }

      socket.emit("stroke:init", strokes[roomId].strokes);

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
      // const room = rooms[roomId];
      // const drawer = room.players[room.drawerIndex];

      startRound(io, roomId);

      // io.to(roomId).emit("round:started", {
      //   drawer: drawer.socketId,
      //   timeLeft: room.drawTime,
      // });
    });

    socket.on("word:select", ({ roomId, words }) => {
      const room = rooms[roomId];
      room.currentWord = words;
      room.phase = "drawing";
      room.timeLeft = room.drawTime;
      io.to(roomId).emit("word:selected", {
        word: room.currentWord,
      });
      startTimer(roomId);
    });

    function startTimer(roomId) {
      const room = rooms[roomId];

      clearInterval(room.timer);

      room.timer = setInterval(() => {
        room.timeLeft--;

        io.to(roomId).emit("timer", room.timeLeft);

        if (room.timeLeft <= 0) {
          clearInterval(room.timer);
          endRound(io, roomId, "Time's up");
        }
      }, 1000);
    }

    socket.on("chat", ({ roomId, text }) => {
      const room = rooms[roomId];

      const player = room.players.find((p) => p.socketId === socket.id);
      if (player.hasGuessed) return;
      if (room.players[roomId] === player.socketId) return;

      if (text.toLowerCase() === room.currentWord.toLowerCase()) {
        player.hasGuessed = true;
        player.score += 10;

        console.log(player.hasGuessed);

        console.log(player.playerName);

        io.to(roomId).emit("player:guessed", {
          playerId: player.socketId,
          name: player.playerName,
        });

        checkEveryoneGuessed(roomId);
      } else {
        io.to(roomId).emit("chat", {
          type: "chat",
          name: player.playerName,
          text: text,
        });
      }
    });

    function checkEveryoneGuessed(roomId) {
      const room = rooms[roomId];

      const drawer = room.players[room.drawerIndex];

      const allGuessed = room.players
        .filter((p) => p.socketId !== drawer.socketId)
        .every((p) => p.hasGuessed);

      if (allGuessed) {
        endRound(io, roomId, "all-guessed");
      }
    }

    // socket.on("chat", ({ roomId, text }) => {
    //   const room = rooms[roomId];
    //   if (!room) return;

    //   const player = room.players.find((p) => p.socketId === socket.id);
    //   if (!player) return;

    //   io.to(roomId).emit("chat", {
    //     type: "chat",
    //     name: player.playerName,
    //     text,
    //   });
    // });

    // socket.on("change", (roomId) => {
    //   const room = rooms[roomId];
    //   if (!room) return;
    //   rotateDrawer(room);
    //   startRound(io, roomId);
    // });
  });
}

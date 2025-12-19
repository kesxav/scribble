import express from "express";
import { nanoid } from "nanoid";
import rooms from "../game/room.js";

const router = express.Router();

router.post("/create", (req, res) => {
  const { drawTime, rounds, maxPlayers, words, hints } = req.body;
  const roomId = nanoid(6);

  rooms[roomId] = {
    drawTime,
    rounds,
    maxPlayers,
    words,
    hints,
    drawerIndex: 0,
    timer: null,
    currentWord: null,
    round: 1,
    phase: "waiting",
    wordChoices: [],
    players: [],
    timeLeft: 0,
  };

  res.json({ roomId });
});

export default router;

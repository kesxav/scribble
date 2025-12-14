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
    players: [],
  };

  res.json({ roomId });
});

export default router;

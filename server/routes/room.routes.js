import express from "express";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/create", (req, res) => {
  const roomId = nanoid(6);
  res.json({ roomId });
});

export default router;

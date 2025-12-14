import express from "express";
import cors from "cors";
import router from "./routes/room.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/room", router);

export default app;

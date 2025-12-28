import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import registerSocket from "./socket.js";
import path from "path"
import { fileURLToPath } from "url";
import express from "express";
import loadWords from "./words.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});


async function start(){
  try{
    const WORDS = await loadWords()
    registerSocket(io,WORDS)

const clientPath = path.join(__dirname,"../client/dist")
app.use(express.static(clientPath))

app.use((req,res)=>{
  res.sendFile(path.join(clientPath,'index.html'))
})
server.listen(3000, () => {
  console.log("Server running on 3000");
});

  }catch(err){
    console.log("server failed to start")
  }
}


start()





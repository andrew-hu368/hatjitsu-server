import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

app.get("/", (_, res) => {
  res.send("Nothing to see here");
});

io.on("connection", (socket) => {
  socket.on("vote", (vote) => {
    io.emit("vote", vote);
  });

  socket.on("reveal votes", () => {
    io.emit("reveal votes");
  });

  socket.on("reset votes", () => {
    io.emit("reset votes");
  });

  socket.on("disconnect", () => {
    console.log(`user id ${socket.id} disconnected`);
  });
});

server.listen(8080, () => {
  console.log("⚡️ Listening on port 8080 ⚡️");
});

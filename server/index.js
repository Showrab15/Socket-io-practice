const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined ${room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("typing", ({ username, room }) => {
    socket.to(data.room).emit("user_typing", username);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("The server port is running on 3000");
});

// kono event listen korte chaile-orthat ami client/server side e kono notification pabo kichu trigger hobe like event listenser tahole on() use korbo
// ami jodi kono kichu bradcasting orthat client side e dekhate chai tahole emmit() use korbo.

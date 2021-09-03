const express = require("express");
const app = express();
const PORT = 5000;
const http = require("http");
const socketio = require("socket.io");

// redis
const redis = require("redis");
const client = redis.createClient();

// ejs
app.set("view engine", "ejs");

// socket
const server = http.createServer(app);
const io = socketio(server).listen(server);

function loadMessage(socket) {
  client.lrange("messages", 0, -1, (err, data) => {
    data.map((x) => {
      const userArr = x.split(":");
      const redisUsername = userArr[0];
      const redisMessage = userArr[1];

      socket.emit("message", {
        from: redisUsername,
        message: redisMessage,
      });
    });
  });
}

io.on("connection", (socket) => {
  // loading message on user joining
  loadMessage(socket);

  socket.on("message", ({ message, from }) => {
    // sending messages to redis cli
    // messages : ["from: message"]
    client.rpush("messages", `${from}:${message}`);
    io.emit("message", { from, message });
  });
});

app.get("/chat", (req, res) => {
  const username = req.query.username;

  io.emit("joined", username);
  res.render("chat", { username });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`PORT is running at ${PORT}`);
});

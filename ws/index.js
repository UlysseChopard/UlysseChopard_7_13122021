const httpServer = require("http").createServer();

const { Server } = require("socket.io");

const handlers = require("./handlers");

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost", "http://localhost:8080"],
    credentials: true,
  },
});

io.on("connection", (socket) => handlers(io, socket));

httpServer.listen(1895);

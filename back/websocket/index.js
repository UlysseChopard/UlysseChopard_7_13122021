const { readdirSync } = require("fs");
const { join } = require("path");

const socketIO = require("socket.io");

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: ["http://localhost", "http://locahost:8080"],
      credentials: true,
    },
  });

  const handlers = (socket) =>
    readdirSync(__dirname).map((file) => {
      if (file !== "index.js") {
        require(join(__dirname, file))(io, socket);
      }
    });

  io.on("connection", handlers);
};

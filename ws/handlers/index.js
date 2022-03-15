const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = (io, socket) => {
  readdirSync(__dirname).map((file) => {
    if (file !== "index.js") {
      require(join(__dirname, file))(io, socket);
    }
  });
};

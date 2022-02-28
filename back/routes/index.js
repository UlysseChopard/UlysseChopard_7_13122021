const { readdirSync } = require("fs");
const path = require("path");

module.exports = (express, app) => {
  try {
    readdirSync(__dirname).map((file) => {
      if (file === "index.js") return;
      require(path.join(__dirname, file))(express, app);
    });
  } catch (e) {
    console.error(e);
  }
};

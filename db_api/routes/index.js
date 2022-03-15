const { readdirSync } = require("fs");
const path = require("path");
const catchAll = require("./catch_all");

module.exports = (express, app) => {
  try {
    readdirSync(__dirname).map((file) => {
      if (file === "index.js" || file === "catch_all.js") return;
      require(path.join(__dirname, file))(express, app);
    });
  } catch (e) {
    console.error(e);
  }
  catchAll(app);
};

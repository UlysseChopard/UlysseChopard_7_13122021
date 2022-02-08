const { readdirSync } = require("fs");
const path = require("path");

module.exports = (app) => {
  try {
    const routes = readdirSync(__dirname);
    routes.forEach((route) => {
      if (route !== "index.js") {
        require(path.join(__dirname, route))(app);
      }
    });
  } catch (e) {
    console.error(e);
  }
};

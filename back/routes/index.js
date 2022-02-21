const { readdirSync } = require("fs");
const path = require("path");

const loadRouters = (app, express) => {
  try {
    const routes = readdirSync(__dirname);
    routes.map((file) => {
      if (file === "index.js") return;
      app.use(require(path.join(__dirname, file))(express));
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = loadRouters;

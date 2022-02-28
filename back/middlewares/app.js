const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

module.exports = (express, app) => {
  app.use(logger("dev"));
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
};

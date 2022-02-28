const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost", "http://localhost:8080"],
  credentials: true,
};

module.exports = (express, app) => {
  app.use(logger("dev"));
  app.use(helmet());
  app.use(compression());
  app.use(express.json());

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
};

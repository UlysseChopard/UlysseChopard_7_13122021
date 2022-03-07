const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost", "http://localhost:8080"],
  credentials: true,
};

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
};

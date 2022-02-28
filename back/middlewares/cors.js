const cors = require("cors");

const logOrigin = (origin, done) => {
  console.log(origin);
  done(null, true);
};
const corsOptions = {
  origin: logOrigin,
  credentials: true,
};

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
};

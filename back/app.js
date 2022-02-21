const logger = require("morgan");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

const { sequelize } = require("./models");
const session = require("./session");
const port = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: "http://localhost",
  credentials: true,
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(compression());

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Session, avant toutes les routes et surtout l'authentification
session(app, sequelize);

app.use("/upload", express.static("./upload"));

require(__dirname + "/routes")(app, express);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server up on http://localhost:", port);
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(console.error);

const shutDown = () => {
  return sequelize
    .close()
    .then(() => {
      console.log("Database connection gracefully closed");
      server.close();
      console.log("Server gracefully closed");
    })
    .catch(console.error);
};

process.on("SIGTERM", shutDown);

process.on("SIGINT", shutDown);

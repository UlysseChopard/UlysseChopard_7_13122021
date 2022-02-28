const express = require("express");
const server = require("./server");
const db = require("./db");
const session = require("./session");
const routes = require("./routes");
const appMiddlewares = require("./middlewares/app");

const { sequelize } = require("./models");

const app = express();

session(sequelize, app);

appMiddlewares(express, app);

// Session, avant toutes les routes et surtout l'authentification
routes(express, app);

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

db(sequelize);

server(app);

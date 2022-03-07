const express = require("express");
const server = require("./server");
const db = require("./db");
const session = require("./session");
const routes = require("./routes");
const appMiddlewares = require("./middlewares/app");
const cors = require("./middlewares/cors");
const catchAll = require("./middlewares/catch_all");

const { sequelize } = require("./models");

const app = express();

// Session avant CORS et routes
db().then((sequelize) => {
  appMiddlewares(express, app);
  session(sequelize, app);
  cors(app);
  routes(express, app);
  catchAll(app);
  return server(app);
});

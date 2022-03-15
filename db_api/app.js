const express = require("express");
const server = require("./server");
const db = require("./db");
const session = require("./session");
const routes = require("./routes");
const middlewares = require("./middlewares");

const app = express();

db().then((sequelize) => {
  middlewares(express, app);
  session(sequelize, app);
  routes(express, app);
  server(app);
});

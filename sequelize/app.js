const fs = require("fs");
const path = require("path");

const express = require("express");

const { sequelize } = require("./models");
const port = 3000;

const app = express();

app.use(express.json());

fs.readdirSync(path.join(__dirname, "/routes")).forEach((file) => {
  require(path.join(__dirname, "/routes", file))(app);
});

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server up on http://localhost:", port);
});

const shutDown = () => {
  sequelize
    .close()
    .then(() => console.log("Database connection gracefully closed"))
    .catch(console.error);
  server.close();
  console.log("Server gracefully closed");
};

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch(console.error);

process.on("SIGTERM", shutDown);

process.on("SIGINT", shutDown);

const dbConfig = require("./db.config");
const fs = require("fs");
const path = require("path");

console.log("dbConfig", dbConfig);
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle,
  },
});

const db = {
  Sequelize,
  sequelize,
};

fs.readdirSync("./models").forEach((file) => {
  db[path.basename(file, path.extname(file))] = require(path.join(
    __dirname,
    "models",
    file
  ))(sequelize, DataTypes);
});

module.exports = db;

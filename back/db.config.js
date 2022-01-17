const secret = require("./secret");

module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USER: secret(process.env.DB_USR),
  PASSWORD: secret(process.env.DB_PASS),
  DB: secret(process.env.DB_NAME),
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const secret = require("../utils/secrets");

module.exports = {
  development: {
    username: "user",
    password: "userpassword",
    database: "groupomania",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "groupomania_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: secret(process.env.DB_USR_FILE) || "root",
    password: secret(process.env.DB_PASS_FILE) || null,
    database: secret(process.env.DB_NAME_FILE) || "groupomania",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
};

const { Sequelize } = require("sequelize");

const createConn = () =>
  new Sequelize(
    `mysql://${process.env.MYSQL_USR}:${process.env.MYSQL_PASS}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DB}`
  );

const tryConn = async (conn) => {
  try {
    await conn.authenticate();
    console.log("Connecté au serveur MySQL");
  } catch (e) {
    console.error("Erreur de connexion à MySQL", e);
  }
};

const closeConn = (conn) => conn.close();

module.exports = {
  createConn,
  tryConn,
  closeConn,
};

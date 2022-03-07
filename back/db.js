const { sequelize } = require("./models");

module.exports = async () => {
  await sequelize.sync({ force: true });
  console.log("Connected to database");

  const close = async () => {
    try {
      await sequelize.close();
      console.log("Database connection gracefully closed");
    } catch (e) {
      console.error(e);
    }
  };

  process.on("SIGTERM", close);

  return sequelize;
};

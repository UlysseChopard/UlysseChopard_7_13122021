const { sequelize } = require("./models");

module.exports = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Connected to database");
  } catch (e) {
    console.error(e);
  }

  const close = async () => {
    try {
      await sequelize.close();
      console.log("Database connection gracefully closed");
    } catch (e) {
      console.error(e);
    }
  };

  process.on("beforeExit", close);

  return sequelize;
};

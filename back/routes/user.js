const { User } = require("../models");

module.exports = (app) => {
  app.get("/users", async (req, res) => {
    try {
      const users = await User.findAll({ include: "posts" });
      return res.json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  });

  app.get("/users/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const users = await User.findOne({ where: { uuid } });
      return res.json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  });

  app.delete("/users/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const user = await User.findOne({ where: { uuid } });
      await user.destroy();
      return res.json({ message: "User deleted!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  });

  app.put("/users/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    try {
      let user = await User.findOne({ where: { uuid } });
      user = { ...user, ...req.body };
      await user.save();
      return res.json({ message: "User modified" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  });

  return app;
};

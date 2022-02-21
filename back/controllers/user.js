const { User } = require("../models");

exports.get = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.modify = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    let user = await User.findOne({ where: { uuid } });
    user = { ...user, ...req.body };
    await user.save();
    return res.status(204).json({ message: "User modified" });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.remove = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });
    await user.destroy();
    return res.status(204).json({ message: "User deleted!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

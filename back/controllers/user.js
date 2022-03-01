const crypto = require("crypto");
const { User } = require("../models");

const checkPassword = (password) => {
  const salt = crypto.randomBytes(16);
  return {
    salt: salt.toString("hex"),
    password: crypto
      .pbkdf2Sync(password, salt, 310000, 32, "sha256")
      .toString("hex"),
  };
};

exports.get = async (req, res) => {
  try {
    const user = await User.findOne({ where: { uuid: req.user.uuid } });
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.modify = async (req, res) => {
  try {
    let user = await User.findOne({ where: { uuid: req.user.uuid } });
    if (req.body?.password) {
      const { salt, password } = checkPassword(req.body.password);
      delete req.body.password;
      user.salt = salt;
      user.password = password;
    }
    Object.entries(req.body).forEach(([k, v]) => (user[k] = v));
    await user.save();
    return res.status(200).json({ message: "User modified", user });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.remove = async (req, res) => {
  try {
    const user = await User.findOne({ where: { uuid: req.user.uuid } });
    await user.destroy();
    return res.status(204).json({ message: "User deleted!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

const { User } = require("../models");

exports.serialize = (user, cb) => {
  process.nextTick(() => cb(null, user.uuid));
};

exports.deserialize = async (uuid, cb) => {
  try {
    const user = await User.findOne({ where: { uuid } });
    cb(null, user);
  } catch (e) {
    cb(e);
  }
};

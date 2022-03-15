const { User } = require("../models");

exports.serialize = ({ uuid }, cb) => {
  console.log("SERIALIZE !!!");
  process.nextTick(() => cb(null, uuid));
};

exports.deserialize = async (uuid, cb) => {
  console.log("DESERIALIZE !!!");
  try {
    const user = await User.findOne({ where: { uuid } });
    cb(null, user);
  } catch (e) {
    cb(e);
  }
};

const bcrypt = require("bcryptjs");

const hashPwd = (pwd) => bcrypt.hashSync(pwd, 10);

const comparePwd = (pwd, hash) => bcrypt.compareSync(pwd, hash);

module.exports = {
  hashPwd,
  comparePwd,
};

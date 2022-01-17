const jwt = require("jsonwebtoken");

const accessKey = "AccesKeyS3cret";

const getJWT = (payload) => jwt.sign(payload, accessKey, { expiresIn: "1h" });

const decodeJWT = (token) => jwt.verify(token, accessKey);

module.exports = {
  getJWT,
  decodeJWT,
};

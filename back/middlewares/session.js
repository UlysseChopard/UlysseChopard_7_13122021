const { decodeJWT } = require("../services/session");

module.exports = (req, res, next) => {
  const token = req?.headers?.authorization.split(" ")[1];
  if (token) {
    try {
      req.token = decodeJWT(token);
      next();
    } catch (e) {
      res.status(500).json({
        message: `An error occured while decoding the JWT. Err: ${e}`,
      });
    }
  } else {
    res.status(401).json({ message: "Authentication needed" });
  }
};

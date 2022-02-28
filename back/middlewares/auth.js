const secret = require("../utils/secrets");

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication must be provided" });
};

exports.isModerator = (req, res, next) => {
  if (req.user.role === "moderator") {
    return next();
  }
  res.status(401).json({ message: "Requires moderator rights" });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  res.status(401).json({ message: "Requires admin rights" });
};

exports.checkRoles = (req, res, next) => {
  if (req.body?.moderatorCode === secret(process.env.MODERATOR_PASS_FILE)) {
    req.body.role = "moderator";
  } else if (req.body?.moderatorCode) {
    return res.status(401).json({ message: "Invalid moderator code" });
  }
  delete req.body.moderatorCode;
  next();
};

exports.allowImages = (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-site");
  next();
};

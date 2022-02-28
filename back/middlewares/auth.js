const secret = require("../utils/secrets");

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication must be provided" });
};

exports.isModerator = (req, res, next) => {
  if (req.user.roles.includes("moderator")) {
    return next();
  }
  res.status(401).json({ message: "Requires moderator rights" });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.roles.includes("admin")) {
    return next();
  }
  res.status(401).json({ message: "Requires admin rights" });
};

exports.isOwner = (req, res, next) => {
  if (req.user.id === req.params.uuid) {
    return next();
  }
  res.status(401).json({ message: "Requires ownership" });
};

exports.checksRolesForSignup = (req, res, next) => {
  console.log("checkMod");
  if (
    req.body?.moderator &&
    req.body.moderator === secret(process.env.MODERATOR_PASS_FILE)
  ) {
    req.body.role = "moderator";
  } else if (req.body?.moderator) {
    return res.status(401).json({ message: "Invalid moderator code" });
  }
  delete req.body.moderator;
  next();
};

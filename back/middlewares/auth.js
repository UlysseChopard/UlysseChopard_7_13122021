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

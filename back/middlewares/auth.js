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
  if (req.user.roles.includes("addmin")) {
    return next();
  }
  res.status(401).json({ message: "Requires admin rights" });
};

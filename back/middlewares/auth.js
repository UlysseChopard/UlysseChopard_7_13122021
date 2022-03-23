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

exports.checkPasswordCompliance = (req, res, next) => {
  // Regex to check if a string
  // contains uppercase, lowercase
  // special character & numeric value
  if (
    !req.body.password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/
    )
  ) {
    console.log("ici");
    return res.status(400).json({
      message:
        "User password must contain at least a lowercase, an uppercase and a special character",
    });
  }

  if (req.body.password.length < 8 || req.body.password.length > 64) {
    return res.status(400).json({
      message: "Password must have 8 characters min and 64 characters max",
    });
  }

  next();
};

exports.allowImages = (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-site");
  next();
};

const crypto = require("crypto");
const { User } = require("../models");

exports.login = (req, res) => {
  res.json({ message: "User connected", user: req.user });
};

exports.signup = async (req, res, next) => {
  const emailAlreadyExists = await User.findOne({
    where: { email: req.body.email },
  });
  console.log("email", emailAlreadyExists);
  console.log("reqEmail", req.body.email);
  if (emailAlreadyExists) {
    return res.status(400).json({
      message: "An account has already been created with this email adress",
    });
  }
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async (err, password) => {
      if (err) return next(err);
      try {
        const user = await User.create({
          ...req.body,
          salt: salt.toString("hex"),
          password: password.toString("hex"),
        });
        req.login(user, (error) => {
          if (error) return next(error);
          res.status(201).json({ message: "User created", user });
        });
      } catch (e) {
        return next(e);
      }
    }
  );
};

exports.logout = (req, res) => {
  req.logout();
  return res.json({ message: "User logged out " });
};

exports.authenticate = async (email, password, cb) => {
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return cb(null, false, { message: "Incorrect email or password" });
    }
    console.log("user", user);
    crypto.pbkdf2(
      password,
      Buffer.from(user.salt, "hex"),
      310000,
      32,
      "sha256",
      (err, hashedPwd) => {
        if (err) return cb(err);
        if (
          !crypto.timingSafeEqual(Buffer.from(user.password, "hex"), hashedPwd)
        ) {
          return cb(null, false, {
            message: "Incorrect email or password",
          });
        }
        return cb(null, user);
      }
    );
  } catch (e) {
    return cb(e);
  }
};

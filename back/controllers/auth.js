const db = require("../db");
const User = db.User;
const auth = require("../services/auth");
const { getJWT } = require("../services/session");

exports.create = (req, res) => {
  if (!req.body.username || !req.body.email) {
    return res.status(400).json({ message: "Additional information needed" });
  }
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: auth.hashPwd(req.body.password),
  };
  User.create(newUser)
    .then((user) =>
      res.status(201).json({
        message: `User with username: ${user.id} successfully created`,
        jwt: getJWT({ userId: user.id }),
      })
    )
    .catch((err) => {
      res.status(500).json({
        message: err.message || "An error occured while creating the User",
      });
    });
};

exports.authenticate = (req, res) => {
  User.findAll({
    where: {
      username: req.body.username,
    },
  })
    .then((users) => {
      const authenticatedUser = users.filter((user) =>
        auth.comparePwd(req.body.password, user.password)
      );
      return res.json({
        message: `Authentifié comme User with user id: ${authenticatedUser[0].id}`,
        jwt: getJWT({ userId: authenticatedUser[0].id }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Could not authenticate User with username=${req.body.username}. Err: ${err}`,
      });
    });
};

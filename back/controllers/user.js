const db = require("../db");
const User = db.User;

exports.findOne = (req, res) => {
  const id = req.token.userId;
  User.findByPk(id)
    .then(({ username, email }) => res.json({ username, email }))
    .catch((err) =>
      res.status(500).json({
        message: err.message || `An error occured while retrieving User ${id}`,
      })
    );
};

exports.update = (req, res) => {
  const id = req.token.userId;
  if (req.body?.password) {
    req.body.password = auth.hashPwd(req.body.password);
  }
  User.update(req.body, {
    where: { id: id },
  })
    .then((exitCode) => {
      if (exitCode.length === 1 && exitCode[0] === 1) {
        res.json({
          message: `User with id=${id} was updated successfully`,
        });
      } else {
        res.json({
          message: `Cannot update User with id=${id}. Maybe this user was not found or req.body is empty`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || `An error occured while updating User ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.token.userId;
  User.destroy({ where: { id: id } })
    .then((exitCode) => {
      if (exitCode === 1) {
        res.json({ message: `User with id=${id} successfully removed` });
      } else {
        res.json({
          message: `User with id=${id} could not be removed. Maybe he was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Could not delete User with id=${id}` });
    });
};

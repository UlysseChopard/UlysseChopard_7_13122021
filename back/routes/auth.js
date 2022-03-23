const passport = require("passport");
const { Strategy } = require("passport-local");

const controller = require("../controllers/auth");
const { checkRoles, checkPasswordCompliance } = require("../middlewares/auth");

module.exports = (express, app) => {
  passport.use(
    new Strategy(
      {
        usernameField: "email",
      },
      controller.authenticate
    )
  );
  app.post("/login", passport.authenticate("local"), controller.login);

  app.post("/signup", checkPasswordCompliance, checkRoles, controller.signup);

  app.post("/logout", controller.logout);
};

const passport = require("passport");
const LocalStrategy = require("passport-local");

const controller = require("../controllers/auth");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    controller.authenticate
  )
);

module.exports = (express) => {
  const router = express.Router();

  router.post("/login", passport.authenticate("local"), controller.login);

  router.post("/signup", controller.signup);

  router.post("/logout", controller.logout);

  return router;
};

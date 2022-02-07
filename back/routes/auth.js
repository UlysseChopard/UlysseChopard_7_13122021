const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const session = require("express-session");

const { User, sequelize } = require("../models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const myStore = new SequelizeStore({ db: sequelize, tableName: "sessions" });

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return cb(null, false, { message: "Incorrect email or password" });
        }
        console.log("user", user);
        crypto.scrypt(
          password,
          Buffer.from(user.salt, "hex"),
          32,
          (err, hashedPwd) => {
            if (err) return cb(err);
            if (
              !crypto.timingSafeEqual(
                Buffer.from(user.password, "hex"),
                hashedPwd
              )
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
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => cb(null, user.uuid));
});

passport.deserializeUser((userUuid, cb) => {
  User.findOne({ where: { uuid: userUuid } })
    .then((user) => cb(null, user))
    .catch((e) => cb(e));
});

module.exports = (app) => {
  app.use(
    session({
      secret: "Keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: myStore,
    })
  );

  myStore.sync();

  app.use(passport.initialize());
  app.use(passport.session());

  app.post("/login", passport.authenticate("local"));

  app.post("/signup", (req, res, next) => {
    const salt = crypto.randomBytes(16);
    crypto.scrypt(req.body.password, salt, 32, async (err, password) => {
      if (err) return next(err);
      try {
        console.log("salt", salt);
        console.log("pwd", password);
        console.log({
          ...req.body,
          salt: salt.toString("hex"),
          password: password.toString("hex"),
        });
        const user = await User.create({
          ...req.body,
          salt: salt.toString("hex"),
          password: password.toString("hex"),
        });
        req.login(user, (error) => {
          if (error) return next(error);
          res.json({ message: "User created" });
        });
      } catch (e) {
        return next(e);
      }
    });
  });

  app.post("/logout", (req, res, next) => {
    req.logout();
    return res.json({ message: "User logged out " });
  });
};

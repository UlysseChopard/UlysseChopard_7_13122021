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
        const user = await User.findOne({
          where: { email: `${email}@groupomania.com` },
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

  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "User connected" });
  });

  app.post("/signup", (req, res, next) => {
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
          console.log({
            ...req.body,
            email: req.body.email,
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
            res.json({ message: "User created", user });
          });
        } catch (e) {
          return next(e);
        }
      }
    );
  });

  app.post("/logout", (req, res, next) => {
    req.logout();
    return res.json({ message: "User logged out " });
  });
};

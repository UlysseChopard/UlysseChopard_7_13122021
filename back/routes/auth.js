const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const session = require("express-session");
const { User } = require("../models");

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
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          (err, hashedPwd) => {
            if (err) return cb(err);
            if (!crypto.timingSafeEqual(user.password, hashedPwd)) {
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
  process.nextTick(() => cb(null, { id: user.id, email: user.email }));
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

module.exports = (app) => {
  app.use(
    session({
      secret: "Keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    "/login",
    passport.authenticate("local", {
      successMessage: "OK",
      failureMessage: "KO",
    })
  );

  app.post("/signup", (req, res, next) => {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async (err, hashedPwd) => {
        if (err) return next(err);
        try {
          const user = await User.create({
            ...req.body,
            salt,
            password: hashedPwd,
          });
          req.login(user, (error) => {
            if (error) return next(error);
            res.json({ message: "User created" });
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

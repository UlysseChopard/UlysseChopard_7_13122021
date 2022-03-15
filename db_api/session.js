const passport = require("passport");

const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const controller = require("./controllers/session");

passport.serializeUser(controller.serialize);

passport.deserializeUser(controller.deserialize);

module.exports = (db, app) => {
  const store = new SequelizeStore({ db, tableName: "sessions" });

  app.use(
    session({
      secret: "Keyboard cat",
      resave: false,
      saveUninitialized: true,
      store,
      cookie: { domain: "http://localhost" },
    })
  );

  store.sync();

  app.use(passport.initialize());

  app.use(passport.session());
};

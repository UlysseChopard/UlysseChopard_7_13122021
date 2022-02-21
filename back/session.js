const passport = require("passport");
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const controller = require("./controllers/session");

passport.serializeUser(controller.serialize);

passport.deserializeUser(controller.deserialize);

module.exports = (app, sequelize) => {
  const myStore = new SequelizeStore({ db: sequelize, tableName: "sessions" });
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
};

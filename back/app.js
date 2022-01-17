const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("./middlewares/session");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/api", session);
app.use("/api/user", userRoute);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;

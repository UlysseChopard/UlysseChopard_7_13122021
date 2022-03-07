module.exports = (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  });

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  });
};

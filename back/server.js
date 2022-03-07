const { createHttpTerminator } = require("http-terminator");

module.exports = async (app) => {
  const port = process.env.PORT || 3000;

  const server = await app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server up on http://localhost:${port}`);
  });

  const httpTerminator = createHttpTerminator({ server });

  process.on("SIGTERM", () => httpTerminator.terminate());

  return server;
};

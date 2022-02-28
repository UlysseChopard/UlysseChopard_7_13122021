module.exports = (app) => {
  const port = process.env.PORT || 3000;

  const server = app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server up on http://localhost:${port}`);
  });

  const close = async () => {
    try {
      await server.close();
      console.log("Gracefully closing the server");
    } catch (e) {
      console.error(e);
    }
  };

  process.on("beforeExit", close);
};

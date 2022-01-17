const http = require("http");

const registerUser = (user) => {
  const payload = new TextEncoder().encode(JSON.stringify(user));
  const options = {
    hostname: "back",
    port: 3000,
    path: "/auth/register",
    method: "GET",
  };

  const req = http.request(options, (res) => {
    console.log(`POST /register: Status code ${res.statusCode}`);
    res.on("data", (d) => process.stdout.write(d));
    res.on("error", (e) => {
      res.resume();
      process.stderr.write(e);
    });
  });

  req.write(payload);
  req.on("error", (e) => process.stderr.write(e));
  req.end();
};

export { registerUser };

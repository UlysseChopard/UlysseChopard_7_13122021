const fs = require("fs");

module.exports = (path) => {
  try {
    return fs.readFileSync(path, "utf-8");
  } catch (e) {
    if (e.code !== "ENOENT") {
      console.error(
        `An error occured while trying to read the secret: ${path}. Err: ${e}`
      );
    } else {
      console.error(
        `Could not find the secret: ${path}. Probably not running in swarm mode. Err: ${e}`
      );
    }
    return false;
  }
};

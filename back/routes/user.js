const controller = require("../controllers/user");
const { isOwner } = require("../middlewares/auth");

module.exports = (express, app) => {
  const router = express.Router();

  router.use(isOwner);

  router.get("/:uuid", controller.get);

  router.put("/:uuid", controller.modify);

  router.delete("/:uuid", controller.remove);

  app.use("/users", router);
};

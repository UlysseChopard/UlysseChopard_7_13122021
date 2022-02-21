const controller = require("../controllers/user");
const { isOwner } = require("../middlewares/auth");

module.exports = (express) => {
  const router = express.Router();

  router.use(isOwner);

  router.get("/users/:uuid", controller.get);

  router.put("/users/:uuid", controller.modify);

  router.delete("/users/:uuid", controller.remove);

  return router;
};

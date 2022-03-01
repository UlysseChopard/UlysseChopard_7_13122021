const controller = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");

module.exports = (express, app) => {
  const router = express.Router();

  router.use(isAuthenticated);
  // Seul l'utilisateur peut modifier son compte
  router.put("/", controller.modify);

  router.get("/", controller.get);

  router.put("/", controller.modify);

  router.delete("/:uuid", controller.remove);

  app.use("/users", router);
};

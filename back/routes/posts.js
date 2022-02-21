const multer = require("../middlewares/multer");
const { isAuthenticated, isOwner } = require("../middlewares/auth");
const controller = require("../controllers/posts");

module.exports = (express) => {
  const router = express.Router();

  router.use(isAuthenticated);

  router.get("/posts", controller.getAll);

  router.delete("/posts/:uuid", isOwner, controller.remove);

  router.post("/posts", multer, controller.create);

  router.put("/posts/:uuid", isOwner, multer, controller.modify);

  return router;
};

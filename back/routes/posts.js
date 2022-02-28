const multer = require("../middlewares/multer");
const {
  isAuthenticated,
  isOwner,
  allowImages,
} = require("../middlewares/auth");
const controller = require("../controllers/posts");

module.exports = (express, app) => {
  const router = express.Router();

  router.get("/", isAuthenticated, controller.getAll);

  router.delete("/:uuid", isOwner, controller.remove);

  router.post("/", isAuthenticated, multer, controller.create);

  router.put("/:uuid", isOwner, multer, controller.modify);

  app.use("/upload", allowImages, express.static("./upload"));

  app.use("/posts", router);
};

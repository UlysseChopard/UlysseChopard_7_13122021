const multer = require("../middlewares/multer");
const {
  isAuthenticated,
  allowImages,
  isModerator,
} = require("../middlewares/auth");
const controller = require("../controllers/posts");

module.exports = (express, app) => {
  const router = express.Router();

  router.get("/", isAuthenticated, controller.getAll);

  router.get("/:id", isAuthenticated, controller.getOne);

  router.delete("/:id", controller.remove);

  router.post("/", isAuthenticated, multer, controller.create);

  router.put("/:id", isAuthenticated, multer, controller.replace);

  router.put("/moderator/:id", isModerator, controller.moderate);

  app.use("/upload", allowImages, express.static("./upload"));

  app.use("/posts", router);
};

const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "/public/images");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});
const upload = multer({
  storage,
});

module.exports = (app) => {
  app.post("/images", upload.single("gif"), (req, res, next) => {
    // req.file is the gif
    // req.body contains rest of data
  });
};

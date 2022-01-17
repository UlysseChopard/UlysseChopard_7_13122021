const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/login", controller.authenticate);
router.post("/register", controller.create);

module.exports = router;

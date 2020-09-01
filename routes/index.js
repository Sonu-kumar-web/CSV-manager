const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

router.get("/", homeController.home);
router.use("/files", require("./files"));
module.exports = router;

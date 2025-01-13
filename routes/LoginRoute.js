const express = require("express");
const middleware = require("../middleware/index");
const loginController = require("../controllers/LoginController");

const router = express.Router();

router.post("/", middleware.checkNameAndPwd, loginController.login);

module.exports = router;

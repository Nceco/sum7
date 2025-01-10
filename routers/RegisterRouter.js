const express = require("express");
const middleware = require("../middleware/index");
const registerController = require("../controllers/RegisterController");

const router = express.Router();

router.post(
  "/",
  [middleware.checkNameAndPwd, middleware.checkPwdLength],
  registerController.register
);

module.exports = router;

const express = require("express");
const middleware = require("../middleware/index");
const pwdController = require("../controllers/PwdController");

const router = express.Router();

router.post(
  "/",
  [
    middleware.checkIdIsNull,
    middleware.checkPwdIsNull,
    middleware.checkPwdLength,
  ],
  pwdController.modifyPwd
);

module.exports = router;

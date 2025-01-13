const express = require("express");
const CaptchaController = require("../controllers/CaptchaController");

const router = express.Router();

router.get("/", CaptchaController.captcha);

module.exports = router;

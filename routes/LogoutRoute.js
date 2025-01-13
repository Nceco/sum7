const express = require("express");
const LogoutController = require("../controllers/LogoutController");

const router = express.Router();

router.post("/", LogoutController.logout);

module.exports = router;

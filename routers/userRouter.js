// 路由整合文件（主文件）
const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

router.get("/all", userController.getUser);

module.exports = router;

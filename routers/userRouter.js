// 路由整合文件（主文件）
const express = require("express");
const middleware = require("../middleware/index");
const userController = require("../controllers/UserController");

const router = express.Router();

router.get("/all", userController.getUser);
// ------需要限制这个id只能是数字 不然会配置所有的 user/* 请求-----
router.get("/:id(\\d)", middleware.checkIdIsNull, userController.getUserById); // Middleware.checkIdIsNull 路由级别的中间件

router.post("/update", middleware.checkIdIsNull, userController.updateUser);

module.exports = router;

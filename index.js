const express = require("express");
const loginRouter = require("./routers/LoginRouter");
const userRouter = require("./routers/UserRouter");

const app = express();

app.use(express.urlencoded({ extended: true })); // 解析post请求
app.use(express.json());

// 注册路由

// user路由
app.use("/login", loginRouter);
app.use("/user", userRouter);

// 错误中间件
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({
      status: 401,
      message: "token认证失败",
    });
  } else {
    res.status(500).send("服务器错误");
  }
});

app.listen(4000, () => {
  console.log("运行在4000端口");
});

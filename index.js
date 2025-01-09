const express = require("express");
const userRouter = require("./routers/userRouter");

const app = express();

// 注册路由

// user路由
app.use("/user", userRouter);

app.listen(4000, () => {
  console.log("运行在4000端口");
});

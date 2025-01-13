const express = require("express");
const session = require("express-session");
const middleware = require("./middleware/index");
const loginRoute = require("./routes/LoginRoute");
const userRoute = require("./routes/UserRoute");
const registerRoute = require("./routes/RegisterRoute");
const pwdRoute = require("./routes/PwdRoute");
const captchaRoute = require("./routes/CaptchaRoute");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.urlencoded({ extended: true })); // 解析post请求
app.use(express.json());

// 注册静态文件访问路径（不需要登录信息验证 需要在middleware.checkToken中间件前注册）
// 访问时输入 ip:port/static/文件名
app.use("/static", express.static("public"));

app.use(middleware.checkToken);
// 注册路由

app.use("/login", loginRoute);
app.use("/captcha", captchaRoute);
app.use("/register", registerRoute);
app.use("/modifyPwd", pwdRoute);
app.use("/user", userRoute);

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

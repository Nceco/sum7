const express = require("express");
const routes = require("./routes");

const app = express();

// 注册路由
app.use("/", routes);

app.listening(4000, () => {
  console.log("运行在3333端口");
});

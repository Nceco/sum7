const db = require("../db/mysql");
const loginService = require("../service/LoginService");

const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const ret = await db.query(loginService.userLogin, [name, password]);
    if (ret.length > 0) {
      res.send({
        code: 200,
        message: "登录成功",
        data: ret[0],
      });
    } else {
      res.send({
        code: 200,
        message: "用户名或密码错误",
      });
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  login,
};

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../db/mysql");
const loginService = require("../service/LoginService");
const common = require("../common/index");

const login = async (req, res) => {
  const { name, password, captcha } = req.body;
  try {
    if (captcha !== req.session.captcha) {
      return res.send({
        code: 300,
        message: "验证码错误",
      });
    }
    const user = await db.query(loginService.userNameExit, [name]);
    if (user.length > 0) {
      const isPwdCorrect = await bcryptjs.compare(password, user[0].password);
      if (isPwdCorrect) {
        const ret = await db.query(loginService.userLogin, [
          name,
          user[0].password,
        ]);
        if (ret.length > 0) {
          const token = jwt.sign({ id: ret[0].id }, common.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
          });
          common.USER_TOKENS_LIST.push(token);
          res.send({
            code: 200,
            message: "登录成功",
            data: {
              ...ret[0],
              token,
            },
          });
        } else {
          res.send({
            code: 200,
            message: "用户名或密码错误",
          });
        }
      } else {
        res.send({
          code: 200,
          message: "用户名或密码错误",
        });
      }
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  login,
};

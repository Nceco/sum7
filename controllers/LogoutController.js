const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../db/mysql");
const loginService = require("../service/LoginService");
const common = require("../common/index");

const logout = async (req, res) => {
  const token = req.headers["authorization"];
  try {
    const token_index = common.BLACK_LIST_TOKENS.indexOf(token);
    if (token_index > -1) {
      common.BLACK_LIST_TOKENS.splice(token_index, 1);
    }
    res.send({
      code: 200,
      msg: "退出成功",
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  logout,
};

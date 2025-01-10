const bcryptjs = require("bcryptjs");
const db = require("../db/mysql");
const registerService = require("../service/RegisterService");
const register = async (req, res) => {
  const { name, password, address, gender } = req.body;
  try {
    const ret = await db.query(registerService.userNameExit, [name]);
    if (ret.length > 0) {
      return res.send({
        code: 200,
        message: "用户名已存在",
      });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashPwd = await bcryptjs.hash(password, salt);
      const ret = await db.query(registerService.userRegister, [
        name,
        hashPwd,
        gender,
        address,
      ]);
      if (ret.affectedRows > 0) {
        return res.send({
          code: 200,
          message: "注册成功",
        });
      }
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  register,
};

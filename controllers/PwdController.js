const bcryptjs = require("bcryptjs");
const db = require("../db/mysql");
const pwdService = require("../service/PwdService");
const modifyPwd = async (req, res) => {
  const { password, id } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashPwd = await bcryptjs.hash(password, salt);
    const ret = await db.query(pwdService.pwdUpdate, [hashPwd, id]);
    if (ret.affectedRows === 1) {
      return res.send({
        code: 200,
        msg: "密码修改成功",
      });
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  modifyPwd,
};

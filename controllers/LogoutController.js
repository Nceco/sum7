const common = require("../common/index");

const logout = async (req, res) => {
  const token = req.headers["authorization"];
  try {
    const token_index = common.USER_TOKENS_LIST.indexOf(token);
    if (token_index > -1) {
      common.USER_TOKENS_LIST.splice(token_index, 1);
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

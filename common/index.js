const JWT_SECRET = "7mu_12";
const WHITE_LIST = ["/login", "/register", "/captcha"];
const USER_TOKENS_LIST = []; // 存储登录用户的token（登出时记得剔除掉）
module.exports = {
  JWT_SECRET,
  WHITE_LIST,
  USER_TOKENS_LIST,
};

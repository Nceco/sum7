const jwt = require("jsonwebtoken");
const common = require("../common/index");
const checkIdIsNull = (req, res, next) => {
  const id = req.params.id || req.body.id;
  if (!id) {
    res.status(400).send({
      code: 400,
      message: "id is required",
    });
  } else {
    next();
  }
};

const checkNameAndPwd = (req, res, next) => {
  const { name, password, captcha } = req.body;
  if (!name || !password) {
    res.status(400).send({
      code: 400,
      message: "name and password are required",
    });
  } else if (!captcha) {
    res.status(400).send({
      code: 400,
      message: "captcha is required",
    });
  } else {
    next();
  }
};

const checkToken = (req, res, next) => {
  // 过滤不需要登录验证的接口
  if (common.WHITE_LIST.includes(req.url)) {
    return next();
  }
  const token = req.headers["authorization"];
  const token_index = common.USER_TOKENS_LIST.indexOf(token);
  if (token_index < 0) {
    return res.status(401).send({
      code: 401,
      message: "Unauthorized",
    });
  }
  if (!token) {
    res.status(401).send({
      code: 401,
      message: "Unauthorized",
    });
  } else {
    jwt.verify(token, common.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          code: 401,
          message: "Unauthorized",
        });
        common.USER_TOKENS_LIST.splice(token_index, 1);
      } else {
        // req.user = decoded;
        next();
      }
    });
  }
};

const checkPwdLength = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 8) {
    res.status(400).send({
      code: 400,
      message: "password length must be at least 8",
    });
  } else {
    next();
  }
};

const checkPwdIsNull = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).send({
      code: 400,
      message: "password is required",
    });
  } else {
    next();
  }
};

module.exports = {
  checkIdIsNull,
  checkNameAndPwd,
  checkToken,
  checkPwdLength,
  checkPwdIsNull,
};

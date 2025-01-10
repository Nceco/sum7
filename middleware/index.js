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
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).send({
      code: 400,
      message: "name and password are required",
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
      } else {
        // req.user = decoded;
        next();
      }
    });
  }
};

module.exports = {
  checkIdIsNull,
  checkNameAndPwd,
  checkToken,
};

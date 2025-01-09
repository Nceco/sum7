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

module.exports = {
  checkIdIsNull,
  checkNameAndPwd,
};

const checkIdIsNull = (req, res, next) => {
  const id = req.params.id || req.body.id;
  if (!id) {
    res.status(400).send({
      code: 400,
      message: "id is required",
    });
  }
  next();
};

module.exports = {
  checkIdIsNull,
};

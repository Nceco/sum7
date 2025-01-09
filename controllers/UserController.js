const db = require("../db/mysql");
const userService = require("../service/UserService");
const getUser = async (req, res) => {
  try {
    const ret = await db.query(userService.userAll);
    res.send({
      code: 200,
      message: "success",
      data: ret,
    });
  } catch (err) {
    res.send(err);
    throw err;
  }
};

const getUserById = async (req, res) => {
  try {
    const ret = await db.query(userService.userById, [req.params.id]);
    res.send({
      code: 200,
      message: "success",
      data: ret,
    });
  } catch (err) {
    res.send(err);
    throw err;
  }
};

const updateUser = async (req, res) => {
  const { id, ...ret } = req.body;
  if (Object.keys(ret).length <= 0) {
    try {
      const ret = await db.query(userService.userById, [id]);
      res.send({
        code: 200,
        message: "success",
        data: ret,
      });
    } catch (err) {
      res.send(err);
      throw err;
    }
    return;
  }
  try {
    const result = await db.query(userService.userUpdate, [ret, id]);
    if (result.affectedRows === 0) {
      res.send({
        code: 404,
        message: "user not found",
      });
    } else {
      const ret = await db.query(userService.userById, [id]);
      res.send({
        code: 200,
        message: "success",
        data: ret,
      });
    }
  } catch (err) {
    res.send(err);
    throw err;
  }
};

const updatePwd = async (req, res) => {};

module.exports = {
  getUser,
  getUserById,
  updateUser,
  updatePwd,
};

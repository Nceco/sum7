const db = require("../db/mysql");
const userService = require("../service/UserService");
const getUser = (req, res) => {
  db.query(userService.userAll)
    .then((ret) => {
      console.log(ret);
      res.send({
        code: 200,
        message: "success",
        data: ret,
      });
    })
    .catch((err) => {
      res.send(err);
      throw err;
    });
};
module.exports = {
  getUser,
};

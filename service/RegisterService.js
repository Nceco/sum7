exports.userRegister =
  "insert into user(name,password,gender,address) values(?,?,?,?)";
exports.userNameExit = "select * from user where name = ?";

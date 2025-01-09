// 似乎要考虑一下sql注入的风险？？？
exports.userAll = "select * from user";
exports.userById = "select * from user where id = ?";
exports.userUpdate = "update user set ? where id = ?";

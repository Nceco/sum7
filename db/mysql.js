const mysql = require("mysql2");
const config = require("./config");

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
});

class MySql {
  constructor() {}
  query(sql) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          throw err;
        }
        connection.query(sql, (err, results, fields) => {
          if (err) {
            reject(err);
            throw err;
          }
          connection.release();
          resolve(results);
        });
      });
    });
  }
}

module.exports = new MySql();

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "101.132.46.74",
  user: "root",
  password: "qaz123wsx",
  database: "7mu_12",
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

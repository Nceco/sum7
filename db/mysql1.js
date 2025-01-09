const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
});

class MySQL {
  constructor() {
    connection.connect((err) => {
      if (err) {
        throw err;
      }
      console.log("Connected to MySQL");
    });
  }
  query(sql) {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results, fields) => {
        if (err) {
          reject(err);
          throw err;
        }
        resolve(results);
      });
    });
  }

  close() {
    connection.end((err) => {
      if (err) {
        throw err;
      }
      console.log("MySQL connection closed");
    });
  }
}

module.exports = new MySQL();

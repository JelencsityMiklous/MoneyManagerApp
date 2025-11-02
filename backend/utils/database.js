const mysql = require("mysql");
const logger = require("./logger");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

function query(sql, params, callback) {
  pool.query(sql, params, (error, results) => {
    if (error) {
      logger.error("SQL hiba:", error);
      callback(error, null);
    } else {
      logger.info(`Lekérdezés sikeres: ${sql}`);
      callback(null, results);
    }
  });
}

module.exports = { query };

const mysql = require("mysql2");
const pool = require("../../sql/connection");
const { handleSQLError } = require("../../sql/error");

const getUserById = (req, res) => {
  let sql = "SELECT * FROM users WHERE id = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

module.exports = {
  getUserById,
};

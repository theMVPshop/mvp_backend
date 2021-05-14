const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const createUser = (req, res) => {
  let { username, isModerator } = req.body;
  let sql = "INSERT INTO users (username, isModerator) VALUE  (?, ?)";
  sql = mysql.format(sql, [username, isModerator]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Created user: ${username}` });
  });
};

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const updateRoleByUsername = (req, res) => {
  let { username, isModerator } = req.body;
  let sql = "UPDATE users SET isModerator = ? WHERE username = ?";
  sql = mysql.format(sql, [isModerator, username]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Updated role: ${username} to ${
        isModerator ? "Moderator" : "Client"
      }`,
    });
  });
};

module.exports = {
  getAllUsers,
  updateRoleByUsername,
  createUser,
};

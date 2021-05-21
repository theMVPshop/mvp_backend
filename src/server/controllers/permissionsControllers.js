const mysql = require("mysql2");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllPermissions = (req, res) => {
  pool.query("SELECT * FROM permissions", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const addPermission = (req, res) => {
  let { username, project_id } = req.body;
  let sql = "INSERT INTO permissions (username, project_id) VALUE  (?, ?)";
  sql = mysql.format(sql, [username, project_id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Added access to project ${project_id} for ${username}`,
    });
  });
};

const removePermission = (req, res) => {
  let sql = "DELETE FROM permissions WHERE id = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Deleted permission with an Id of ${req.params.id}`,
      id: req.body.id,
    });
  });
};

module.exports = {
  addPermission,
  getAllPermissions,
  removePermission,
};

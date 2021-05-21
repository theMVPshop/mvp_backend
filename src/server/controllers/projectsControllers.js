const mysql = require("mysql2");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllProjects = (req, res) => {
  pool.query("SELECT * FROM projects", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createProject = (req, res) => {
  let { title, description } = req.body;
  let sql = "INSERT INTO projects (title, description) VALUE (?, ?)";
  sql = mysql.format(sql, [title, description]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Created project: ${rows.insertId}` });
  });
};

const removeProjectById = (req, res) => {
  let sql = "DELETE FROM projects WHERE id = ?";
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
  getAllProjects,
  createProject,
  removeProjectById,
};

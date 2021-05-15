const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getMilestoneByProject = (req, res) => {
  let sql = "SELECT * FROM milestones WHERE project_id = ?";
  sql = mysql.format(sql, [req.params.project_id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createMilestone = (req, res) => {
  console.log("the whole request", req.body);
  let {
    ms_status,
    due_date,
    title,
    subtitle,
    project_id,
    description,
  } = req.body;
  let sql =
    "INSERT INTO milestones (title, subtitle, project_id, due_date, ms_status, description) VALUE (?, ?, ?, ?, ?, ?)";
  sql = mysql.format(sql, [
    title,
    subtitle,
    project_id,
    due_date,
    ms_status,
    description,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Created milestone: ${rows.insertId}` });
  });
};

const deleteMilestoneById = (req, res) => {
  let { id } = req.body;
  let sql = "DELETE FROM milestones WHERE id = ? AND project_id = ?";
  sql = mysql.format(sql, [id, req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Deleted milestone: ${id}`,
      id: req.body.id,
    });
  });
};

const updateMilestoneById = (req, res) => {
  let { title, subtitle, project_id, due_date, ms_status, id } = req.body;
  let sql =
    "UPDATE milestones SET title = ?, subtitle = ?, project_id = ?, due_date = ?, ms_status = ? WHERE id = ?";
  sql = mysql.format(sql, [
    title,
    subtitle,
    project_id,
    due_date,
    ms_status,
    id,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Updated Milestone: ${rows.insertId}` });
  });
};

const updateMilestoneStatusById = (req, res) => {
  let { ms_status } = req.body;
  let sql = "UPDATE milestones SET ms_status = ? WHERE id = ?";
  sql = mysql.format(sql, [ms_status, req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Updated Milestone Status of milestone ${req.params.id} to ${ms_status}`,
    });
  });
};

module.exports = {
  getMilestoneByProject,
  createMilestone,
  deleteMilestoneById,
  updateMilestoneById,
  updateMilestoneStatusById,
};

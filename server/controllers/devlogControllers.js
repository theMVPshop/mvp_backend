const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getDevlogByProject = (req, res) => {
    let sql = "SELECT * FROM devlog WHERE project_id = ?"
    sql = mysql.format(sql, [ req.params.project_id ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    })
}

const createDevlog = (req, res) => {
    console.log('the whole request', req.body)
    let { title, description, project_id, time_stamp } = req.body
    let sql = "INSERT INTO devlog (title, description, project_id, time_stamp) VALUE (?, ?, ?, ?)"
    sql = mysql.format(sql, [ title, description, project_id, time_stamp ]);

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Created Devlog: ${rows.insertId}` });
    })
}

const deleteDevlogById = (req, res) => {
    let sql = "DELETE FROM devlog WHERE id = ?"
    sql = mysql.format(sql, [ req.params.id ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Deleted Devlog: ${rows.affectedRows}`, id: req.body.id });
    })
}

const updateDevlogById = (req, res) => {
    let { title, description, project_id, time_stamp, id } = req.body;
    let sql = "UPDATE devlog SET title = ?, subtitle = ?, project_id = ?, due_date = ?, ms_status = ? WHERE id = ?"
    sql = mysql.format(sql, [ title, description, project_id, time_stamp, id ]);

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Updated Devlog: ${rows.insertId}` });
    })
}

module.exports = {
    getDevlogByProject,
    createDevlog,
    deleteDevlogById,
    updateDevlogById
}
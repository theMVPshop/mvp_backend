const mysql = require('mysql');
require ('dotenv').config();

class Connection {
    constructor() {
        if (!this.pool) {
            console.log('creating mysql connection...');

            const config = {
                connectionLimit: 100,
                host: process.env.DB_HOST,
                port: 3306,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: 'db9201_MVP'
            }

            this.pool = mysql.createPool(config);

            return this.pool;
        }

        return this.pool
    }
}

const instance = new Connection()
module.exports = instance;
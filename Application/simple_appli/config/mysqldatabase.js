const fs = require('fs');
const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createConnection({
  host: process.env.DB_HOST,   // RDS endpoint
  user: process.env.DB_USER,   // RDS username
  password: process.env.DB_PASS, // RDS password
  connectionLimit: 10,
  multipleStatements: true   // allow multi-statement .sql files
});

pool.connect((err, connection) => {
  if (err) {
    console.error('Error connecting to Amazon RDS:', err);
    return;
  }
  console.log('Connected to Amazon RDS!');
   const sql = fs.readFileSync(__dirname + '/createTable.sql', 'utf8');
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL file:', err);
    } else {
      console.log('Database and table ensured!');
    }
  });
});

module.exports = pool;
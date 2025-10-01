const mysql = require('mysql2/promise');

let pool;

async function connectWithRetry(retries = 5, delay = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      // test connection
      const [rows] = await pool.query('SELECT NOW() AS time');
      console.log(`✅ DB Connected at ${rows[0].time}`);
      return pool;
    } catch (err) {
      console.log(`❌ DB not ready (attempt ${i}/${retries}): ${err.message}`);
      if (i < retries) {
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw err;
      }
    }
  }
}

function getPool() {
  return pool;
}

module.exports = { connectWithRetry, getPool };

const express = require('express');
const { getPool } = require('../config/connectioncheck');  // export pool or getter
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.user_login);
router.get('/signup', userController.sign_up);
router.post('/signup/submit', userController.user_create);
router.post('/login/submit', userController.user_login_post);

// ✅ Health endpoint
router.get('/health', async (req, res) => {
  try {
    const pool = getPool();   // get current pool
    if (!pool) {
      return res.status(503).json({ status: 'DOWN', error: 'DB not initialized' });
    }
    const [rows] = await pool.query('SELECT 1'); // simple test query
    res.json({ status: 'UP', db: 'CONNECTED' });
  } catch (err) {
    res.status(500).json({ status: 'DOWN', error: err.message });
  }
});

module.exports = router;

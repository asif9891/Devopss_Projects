const mysqldatabase = require('../config/mysqldatabase.js');
const bcrypt = require('bcrypt');

module.exports.user_login = function(req, res) {
    return res.render('login', { title: "Login",user: req.session.user ? req.session.user.username : null });
};

module.exports.user_signup = function(req, res) {
    return res.render('signup', { title: "Sign Up", user: req.session.user ? req.session.user.username : null });
};

module.exports.user_create = async function(req, res) {
    const { username, email, password } = req.body;

  mysqldatabase.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length > 0) return res.status(400).send('Email already registered');

    try {
      // Generate salt
      const salt = await bcrypt.genSalt(10);

      // Hash with salt
      const hash = await bcrypt.hash(password, salt);

      // Save both hash + salt in DB
      const newUser = { username, email, password_hash: hash, password_salt: salt };

      mysqldatabase.query('INSERT INTO users SET ?', newUser, (err, results) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).send('Error creating user');
        }
        return res.redirect('/login');
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error while hashing password');
    }
  });
};

module.exports.user_login_post = async function (req, res) {
  const { email, password } = req.body;

  mysqldatabase.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(400).send('Invalid email or password');

    const user = results[0];

    try {
      // Verify password using stored hash
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) return res.status(400).send('Invalid email or password');

      // ✅ Store session
      req.session.user = { id: user.id, username: user.username, email: user.email };

      return res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error while verifying password');
    }
  });
};

module.exports.user_logout = function(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');
    });
}

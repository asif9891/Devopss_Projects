const mysqldatabase = require('../config/mysql.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.user_login = function (req, res) {
  return res.render('login', { title: "Login", user: req.session.user ? req.session.user.username : null });
};

module.exports.sign_up = function (req, res){
  return res.render('signup.ejs',{title:"Signup", user: req.session.user ? req.session.user.username : null })
}

module.exports.user_create = async function (req, res) {
  const { username, email, password, cateogry } = req.body;

  mysqldatabase.query(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [email, username],
    async (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length > 0) return res.status(400).send('Email or username already registered');

      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = { username, email, cateogry, H_Pass: hash, S_pass: salt };

        mysqldatabase.query('INSERT INTO users SET ?', newUser, (err, results) => {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Error creating user');
          }
          return res.redirect('/');
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send('Error while hashing password');
      }
    }
  );
};

module.exports.user_login_post = async function (req, res) {
  const { username, password, cateogry } = req.body;
  console.log(req.body);

  mysqldatabase.query(
    'SELECT * FROM users WHERE username = ? AND cateogry = ?',
    [username, cateogry],
    async (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length === 0) return res.status(400).send('Invalid username, category, or password');

      const user = results[0];
      console.log(user);

      try {
        // Verify password using stored hash
        const isMatch = await bcrypt.compare(password, user.H_Pass);

        if (!isMatch) return res.status(400).send('Invalid username, category, or password');
        console.log(isMatch);

        // ✅ Store session
        req.session.user = { id: user.id, username: user.username, cateogry: user.cateogry, email: user.email };
        const auser = { username: user.username, s_key: req.sessionID, email: user.email };
        mysqldatabase.query('INSERT INTO auser SET ?', auser, (err, results) => {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Error creating user');
          }
          let cateogry = user.cateogry;
          const token = jwt.sign(
          { username: user.username, email: user.email, category: user.category },
          'YOUR_SHARED_SECRET',  // Must match Java app
          { expiresIn: '1h' }
        );

        console.log(cateogry)

        // Redirect based on category
        if (cateogry == "Faculty") {
          return res.redirect(`http://localhost:5000?token=${token}`);
        } else if (cateogry == "Teacher") {
          return res.redirect(`http://localhost:8080?token=${token}`);
        } else {
          return res.status(400).send('Unknown category');
        }
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send('Error while verifying password');
      }
    }
  );
};
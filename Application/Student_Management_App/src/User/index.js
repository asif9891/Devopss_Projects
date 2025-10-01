const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const { connectWithRetry } = require('./config/connectioncheck');

async function startApp() {
  try {
    // ✅ Run only once at startup
    await connectWithRetry(10, 5000);


    app.use(express.urlencoded());
    // Setup express-session
    app.use(
      session({
        secret: 'mySuperSecretKey',   // 🔑 change this to a strong random key
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,   // set true if using HTTPS
          maxAge: 1000 * 60 * 60 // 1 hour
        }
      })
    );

    app.set('views', path.join(__dirname, 'pages'));
    app.set('view engine', 'ejs');
    app.use(express.static('./assets'));
    app.use(expressLayouts); // Add this line

    app.use('/', require('./routes'));

    app.listen(port, (err) => {
      if (err) return console.log(`Error in running Server ${err} on port ${port}`)
      console.log(`Server is running on port ${port}`)
    })
  } catch (err) {
    console.error("❌ Could not connect to DB, exiting:", err.message);
    process.exit(1);
  }
}

startApp();

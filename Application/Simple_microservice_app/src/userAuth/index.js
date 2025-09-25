// filepath: c:\Users\Admin\Documents\DEVOPS\Application\simple_appli\index.js
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
//import mysqldatabase from './config/mysqldatabase';
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();

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

app.listen(port,"0.0.0.0", (err) => {
    if (err) {
        console.log(`Server encountered error with running port ${port} with error: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});


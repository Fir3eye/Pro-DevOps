// src/config/session.js
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const sessionStore = new MySQLStore(options);

const sessionMiddleware = session({
  key: 'session_cookie_name', // Name of the cookie
  secret: process.env.SESSION_SECRET, // Replace with a strong secret
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

module.exports = sessionMiddleware;

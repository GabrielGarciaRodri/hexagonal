const session = require('express-session');
const sessionGoogleOAuth = require('express').Router();

module.exports = sessionGoogleOAuth.use(session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: false
}))

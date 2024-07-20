const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  global.db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));

// Configure session management
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const router = express.Router();

// Log in requests
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Log out request
router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Sign up requests
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  const {username, password} = req.body;
  const salt = crypto.randomBytes(16);

  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return next(err); }
    db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      salt
    ], function(err) {
      if (err) return next(err);
      const user = {
        id: this.lastID,
        username: username
      };
      req.login(user, function(err) {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  });
});

// Export the router object so index.js can access it
module.exports = router;
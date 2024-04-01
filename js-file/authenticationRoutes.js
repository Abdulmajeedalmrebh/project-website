const express = require('express');
const passport = require('passport');
const User = require('./models/user');

const router = express.Router();

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true // Enable flash messages for failed login attempts
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if username is already taken
  User.findOne({ username: username }, (err, existingUser) => {
    if (err) {
      console.error(err);
      req.flash('error', 'An error occurred. Please try again.');
      res.redirect('/register');
    } else if (existingUser) {
      req.flash('error', 'Username is already taken.');
      res.redirect('/register');
    } else {
      // Create a new user with the provided username and password
      const newUser = new User({ username: username });
      User.register(newUser, password, (err, user) => {
        if (err) {
          console.error(err);
          req.flash('error', 'An error occurred during registration. Please try again.');
          res.redirect('/register');
        } else {
          // Log in the newly registered user
          passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Registration successful. Welcome!');
            res.redirect('/dashboard');
          });
        }
      });
    }
  });
});

module.exports = router;

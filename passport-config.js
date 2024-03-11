const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user'); // Assuming you have a User model

passport.use(new LocalStrategy({ usernameField: 'userId' }, (userId, password, done) => {
  User.findOne({ userId: userId }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

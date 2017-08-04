const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // Sends along the Mongo ID (Not the googleId)
  // Can't assume everyone will have googleId (with multiple auth)
  done(null, user.id);
});

const getOrSaveUser = (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      // If there is already a user, find that user and send it along
      done(null, existingUser);
    } else {
      // Otherwise, create a new user and send that user along
      new User({ googleId: profile.id }).save()
        .then(user => done(null, user));
    }
  });
};

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, getOrSaveUser)
);

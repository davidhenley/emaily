const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');

const User = mongoose.model('users');

const getOrSaveUser = (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser);
    } else {
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

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

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  done(null, user);
});

const getOrSaveUser = async (accessToken, refreshToken, profile, done) => {
  let existingUser = await User.findOne({ googleId: profile.id });

  if (existingUser) {
    // If there is already a user, find that user and send it along
    return done(null, existingUser);
  }

  // Otherwise, create a new user and send that user along
  let user = await new User({ googleId: profile.id }).save();
  done(null, user);
};

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, getOrSaveUser)
);

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log({ accessToken, refreshToken, profile });
  })
);

// Attempt to get code from Google OAuth
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// User will have the code, exchange for user profile
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});

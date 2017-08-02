const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (authToken) => {
  console.log(authToken);
}));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});
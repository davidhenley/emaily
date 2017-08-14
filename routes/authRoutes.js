const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  // Attempt to get code from Google OAuth
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // Takes the code from the url and fetches the user profile from Google
  // Then redirects to the /surveys route
  res.redirect('/surveys');
});

router.get('/logout', (req, res) => {
  // Logout user (remove cookie) and redirect to root route
  req.logout();
  res.redirect('/');
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;

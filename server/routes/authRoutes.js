const express = require('express');
const router = express.Router();

const passport = require('passport');

// Attempt to get code from Google OAuth
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Takes the code from the url and fetches the user profile from Google
// Then redirects to the /surveys route
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/surveys');
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;

const passport = require('passport');

module.exports = (app) => {
  // Attempt to get code from Google OAuth
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // User will have the code, exchange for user profile
  app.get('/auth/google/callback', passport.authenticate('google'));
};

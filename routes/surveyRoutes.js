const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/Survey');

router.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
  
});

module.exports = router;

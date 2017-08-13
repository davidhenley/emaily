const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email })),
    _user: req.user.id
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));

  // await mailer.send();
});

router.get('/api/surveys', (req, res) => {
  res.send({ message: 'Survey Route' });
});

module.exports = router;

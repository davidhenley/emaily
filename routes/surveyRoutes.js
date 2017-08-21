const express = require('express');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.post('/', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email })),
    _user: req.user.id
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (e) {
    res.status(422).send(e);
  }
});

router.post('/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');
  const events = _.chain(req.body)
    .map(({ url, email }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        const { surveyId, choice } = match;
        return { email, surveyId, choice };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: { email, responded: false }
        }
      }, {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date()
      }).exec();
    })
    .value();

  res.send({});
});

router.get('/:id/:choice', (req, res) => {
  res.send('Thanks for voting!');
});

module.exports = router;

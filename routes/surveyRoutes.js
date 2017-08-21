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

router.get('/', requireLogin, async (req, res) => {
  // Find all surveys that match the user, excluding recipients from query
  const surveys = await Survey.find({ _user: req.user.id }).sort({dateSent: -1}).select({
    recipients: false
  });
  res.send(surveys);
});

router.post('/', requireLogin, requireCredits, async (req, res) => {
  const { title, from, subject, body, recipients } = req.body;

  // Create a new survey while turning list of emails into array of objects
  const survey = new Survey({
    title,
    from,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email })),
    _user: req.user.id
  });

  // Create new mailer passing the survey and template in
  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    // Send survey, save survey, deduct a credit from user, save user, send back user
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
  // Create path string to test
  const p = new Path('/api/surveys/:surveyId/:choice');
  const events = _.chain(req.body)
    // Map over req.body and pull off url and email properties
    .map(({ url, email }) => {
      // Test url to see if matches path regex
      const match = p.test(new URL(url).pathname);
      if (match) {
        // If there is a match, return an object with the email, id, and choice
        const { surveyId, choice } = match;
        return { email, surveyId, choice };
      }
    })
    // Remove all undefined
    .compact()
    // Remove all duplicates
    .uniqBy('email', 'surveyId')
    // For each object, pull off surveyid, email, choice
    .each(({ surveyId, email, choice }) => {
      // Find that survey with the email and false responded
      Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: { email, responded: false }
        }
      }, {
        // Increment choice by one, set responded to true and add date
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date()
      }).exec();
    })
    // Pull off array and send down chain to events
    .value();

  res.send({});
});

router.get('/:id/:choice', (req, res) => {
  res.send('Thanks for voting!');
});

router.delete('/delete/:id', async (req, res) => {
  await Survey.deleteOne({ _id: req.params.id });
  const surveys = await Survey.find({ _user: req.user.id }).sort({dateSent: -1}).select({
    recipients: false
  });
  res.send(surveys);
});

module.exports = router;

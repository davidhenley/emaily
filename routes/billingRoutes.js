const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

router.post('/api/stripe', requireLogin, async (req, res) => {
  // Create $5 charge on Stripe's API with Stripe token id
  let charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    source: req.body.id,
    description: "$5 for 5 credits"
  });

  // Add 5 credits to user model, save user model, then send new user.
  req.user.credits += 5;
  // Save and send back user with new credits
  const user = await req.user.save();
  res.send(user);
});

module.exports = router;

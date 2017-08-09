const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

router.post('/api/stripe', async (req, res) => {
  // Make sure user is logged in (Temp fix until middleware)
  if (!req.user) {
    return res.status(401).send({ error: 'You must be logged in' });
  }

  // Create charge on Stripe's API
  let charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    source: req.body.id,
    description: "$5 for 5 credits"
  });

  // Add 5 credits to user model, save user model, then send new user.
  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});

module.exports = router;

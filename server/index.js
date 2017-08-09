const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.sessionKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(billingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});

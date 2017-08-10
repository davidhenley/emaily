const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/billingRoutes');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.sessionKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(billingRoutes);
app.use(surveyRoutes);

if (process.env.NODE_ENV === 'production') {
  // Make sure express will serve up production assets
  // like main.js, main.css files
  app.use(express.static('client/build'));

  // Express serve up index.html file
  // if it doesn't find any other route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: ObjectId } = Schema;
const Recipient = require('./Recipient');

const SurveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  from: { type: String, trim: true },
  recipients: [Recipient],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: ObjectId, ref: 'User' },
  dateSent: { type: Date, default: Date.now },
  lastResponded: Date
});

module.exports = mongoose.model('Survey', SurveySchema);

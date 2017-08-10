const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipientSchema = new Schema({
  email: { type: String, trim: true },
  responded: { type: Boolean, default: false }
});

module.exports = RecipientSchema;

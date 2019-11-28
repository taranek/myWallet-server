const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionModel = new Schema(
  {
    timestamp: { type: String },
    amount: { type: Number },
    base: { type: String },
    title: { type: String },
    person: { type: String },
  },
);
module.exports = mongoose.model('Transaction', transactionModel);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const balanceModel = new Schema(
  {
    amount: { type: Number },
    updatedOn: { type: String },
  },
  { collection : 'balance' },
);
module.exports = mongoose.model('Balance', balanceModel);

const express = require('express');
const cors = require('cors');
const moment = require('moment');
const corsOptions = require('./../cors/corsOptions')();


function routes(Transaction, Balance) {
  const transactionRouter = express.Router();
  transactionRouter.route('/transactions')
    .post((req, res) => {
      if (isNaN(req.body.amount)) {
        return res.status(400).send('Incorrect amount format');
      }
      Balance.findOne((err, balance) => {
        if (err) {
          return res.send(err);
        }
        const accountBalance = balance.amount;
        const transactionAmount = (parseFloat(req.body.amount));
        const isWithdrawal = (transactionAmount < 0);
        if (isWithdrawal && Math.abs(transactionAmount) > accountBalance) {
          return res.status(400).send('You cannot withdraw more money than you have!');
        }
        balance.amount = accountBalance + transactionAmount;
        balance.updatedOn = req.body.timestamp;
        const transaction = new Transaction(req.body);
        balance.save();
        transaction.save();
        return res.status(201).json(balance);
      });
    })
    .get(cors(corsOptions), (req, res) => {
      Transaction.find((err, transactions) => {
        if (err) {
          return res.send(err);
        }
        return res.json(transactions);
      });
    });
  return transactionRouter;
}
module.exports = routes;

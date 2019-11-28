const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const corsOptions = require('./cors/corsOptions');
const Transaction = require('./models/transactionModel');
const Balance = require('./models/balanceModel');
const transactionRouter = require('./routes/transactionRouter')(Transaction, Balance);
const port = process.env.PORT || 4444;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let db;

if (process.env.NODE_ENV !== 'development') {
  db = mongoose.connect('mongodb://taranek:taranekdb27@ds061807.mlab.com:61807/heroku_l21k4mc2');
} else {
  db = mongoose.connect('mongodb://localhost/myWalletAPI');
}


app.use('/api', cors(corsOptions()), transactionRouter);

app.get('/', (req, res) => {
  res.send('Welcome to API! This is myWallet API!');
});
app.listen(port, () => {
  console.log(`Running on port:${port}`);
});

const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connect('mongodb://localhost/myWalletAPI');
const transactionRouter = express.Router();
const port = process.env.PORT || 4444;
const clientAppPort = process.env.CLIENT_APP_PORT || 3333;
const Transaction = require('./models/transactionModel')

var cors = require('cors')

var whitelist = [`http://localhost:${clientAppPort}`]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use('/api',cors(corsOptions),transactionRouter);

transactionRouter.route('/transactions',)
    .get(cors(corsOptions),(req,res)=>{
      Transaction.find((err,transactions)=>{
        if(err){
          return res.send(err);
        }
          return res.json(transactions);
      })
    });

app.get('/',(req,res)=>{
    res.send('Welcome to API!');
})
app.listen(port,()=>{
    console.log('Running on port:'+port)
})
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');

require('dotenv').config();

var app = express();
var port = process.env.port || 5000;

app.use(cors());

const mongooseconnection = mongoose.connection;
const uri = process.env.MONGODB_URL;

mongoose.connect(uri, { useNewUrlParser: true });

try {
   mongooseconnection.once('open', () => {
      console.log(chalk.green.bold('Successfully connected to database'));
  });
} catch (error) {
    console.log(chalk.red.bold('Error connecting to database'));
    console.log(error);
}
  

app.get('/', function(req,res){
    res.json('Up and running');
    console.log('Up and running');
});

app.listen(port, () => {
    console.log(chalk.green.bold.inverse(`Server is running on port ${port}`));
});

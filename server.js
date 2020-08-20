const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const mongooseconnection = mongoose.connection;
const uri = process.env.MONGODB_URL;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

try {
   mongooseconnection.once('open', () => {
      console.log(chalk.green.bold('Successfully connected to database'));
  });
} catch (error) {
    console.log(chalk.red.bold('Error connecting to database'));
    console.log(error);
}
  
//require and use routes on the next few lines
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(chalk.green.bold.inverse(`Server is running on port ${port}`));
});

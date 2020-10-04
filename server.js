const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Body parser
app.use(express.json());

// DB Config

const db = require('./config/key').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((error) => console.log(error));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started in port ' + port));

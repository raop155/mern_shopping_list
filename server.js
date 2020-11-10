const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');

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

// Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log('Server started in port ' + port));

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const items = require('./routes/api/items');
const { AwakeHeroku } = require('awake-heroku');

AwakeHeroku.add({
  url: 'https://shopping-list-mern-production.herokuapp.com',
});

const app = express();

// Body parser
app.use(express.json());

// DB Config

const db = require('./config/key').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((error) => console.log(error));

// Use Routes
app.use('/api/items', items);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log('Server started in port ' + port));

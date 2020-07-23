const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.get('/secret-page', (req, res) => {
  res.status(200).send('You found the secret page. Whaaaa?');
});

app.get('/', (req, res) => {
  res.status(200).send('It is what it is.');
});

// Server start-up configuration
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening for requests on http://localhost/${port}`);
});

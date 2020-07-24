const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

const routes = require('./routes');

// Middlewares
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.use('/', routes);

// Server start-up configuration
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening for requests on http://localhost:${port}`);
});

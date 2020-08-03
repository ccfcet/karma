const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

const routes = require('./routes');

require('./db/db');

// Middlewares
app.use(morgan('tiny'));
app.use(helmet());

// Routes
app.use('/', routes);

module.exports = app;

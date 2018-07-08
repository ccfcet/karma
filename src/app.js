const createError = require('http-errors');
const express = require('express');
// var path = require('path')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const helmet = require('helmet');
const cors = require('cors');
const celebrateErrors = require('celebrate').errors;

const router = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')))

app.use(cors());
app.use(helmet());

app.use('/', router);

app.use(celebrateErrors);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

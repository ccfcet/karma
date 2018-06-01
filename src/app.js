var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var cors = require('cors')
var logger = require('morgan')
var bodyParser = require('body-parser')
var helmet = require('helmet')

// Router
var router = require('./routes/index')

var debug = require('debug')('app')
var app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())
app.use('/', router)

if (!debug.enable) {
  debug('Server started')
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.locals.error = err
  // render the error page
  res.status(err.status || 500)
  res.json(err)
})

module.exports = app

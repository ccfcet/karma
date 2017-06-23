var admin = require("firebase-admin");
//Firebase.json here

// var serviceAccount = require("./firebase.json");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');

//For firebase auth
// var token = require('./middleware/token')

//Router
var router = require('./routes/index');

var config = require('./config')()
var debug = require('debug')('app');
var app = express();

//Firebase Initialize

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: config.firebase.databaseURL
// });

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
// app.use(token);
app.use('/', router);

if(!debug.enable)
{
    debug('Server started')
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.locals.error = err;
    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;
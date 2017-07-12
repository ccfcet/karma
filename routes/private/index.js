var express = require('express');
var router = express.Router();
var models = require('../../models');
var debug = require('debug')('admin');
var _ = require('underscore');
var superAdminStatus = 10;

router.use('/test', require('./test'));
router.get('/', (req, res, next) => {
    debug(req.query);
    res.send({ "success": true, "api": "admin" }).status(200);
});

module.exports = router;
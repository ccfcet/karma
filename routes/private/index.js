var express = require('express');
var router = express.Router();
var models = require('../../models');
var debug = require('debug')('admin');
var _ = require('underscore');
var superAdminStatus = 10;

router.get('/', function(req, res, next)
{
    res.send({ 'status': 200 });
});

module.exports = router;

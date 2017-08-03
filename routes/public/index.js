var express = require('express');
var router = express.Router();
var models = require('../../models');
var debug = require('debug')('admin');
var _ = require('underscore');
var superAdminStatus = 10;

router.use('/information', require('./information'));

module.exports = router;

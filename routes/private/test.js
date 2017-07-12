var router = require('express').Router();
var debug = require('debug')('admin')
var models = require('../../models');
var Promise = require('bluebird');
var _ = require('underscore');

router.get('/:id', (req, res, next) => {
    res.json({ "success": req.params.id });
});
router.get('/', (req, res, next) => {
    res.json({ "success": "/test" });
});


module.exports = router;
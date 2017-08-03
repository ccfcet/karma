var express = require('express');
var router = express.Router();
var models = require('../../../models');
var debug = require('debug')('admin');
var _ = require('underscore');
var superAdminStatus = 10;

router.get('/:slug/:entity', function(req, res) {
  models.information.findAll({
    include: [{ model: models.entities, attributes: [`ename`], where: { ename: req.params.entity }}, { model: models.slugs, attributes: [`slugName`], where: { slugName: req.params.slug } }],
    // where: { ename: req.params.entity },
    attributes: ['data']
  }).then(function(result) {
    result = result[0].data;
    res.json({ "value": result });
    // return result;
  }).catch(function (err) {
    // handle error;
    res.json({ "success": "false" });
  });
});

router.get('/', (req, res, next) => {
  res.json({ "success": "true" });
});

module.exports = router;

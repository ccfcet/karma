var express = require('express');
var router = express.Router();
var models = require('../../models');
var debug = require('debug')('admin');
var _ = require('underscore');
var superAdminStatus = 10;

/**
* @api {get} / public
* @apiName API Success Test
* @apiGroup Public
* @apiSuccessExample {json} Test Success
{
"success":true
}
*
* @apiErrorExample {json} error
{

}
*/

router.get('/', function(req, res, next)
{
  res.send({ 'status': 200 });
});

router.use('/information', require('./information'));

module.exports = router;

var express = require('express');
var router = express.Router();

/**
 * @api {get} /
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

router.use('/public', require('./public'))
router.use('/private', require('./private'))

module.exports = router;

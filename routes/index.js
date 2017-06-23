var express = require('express');
var router = express.Router();

/**
 * @api {get} / Test
 * @apiName Index
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
router.get('/', function(req, res, next) {
  res.send({'success':true});
});

module.exports = router;

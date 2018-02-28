var express = require('express')
var router = express.Router()

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

router.get('/', function (req, res, next) {
  res.send({ 'status': 200 })
})

router.use('/information', require('./information'))

router.use('/menu', require('./menu'))

module.exports = router

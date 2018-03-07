var express = require('express')
var router = express.Router()

/**
 * @api {get} / Karma Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName KarmaEntryGate
 * @apiGroup Karma
 *
 * @apiSuccess {String} name Karma API.
 * @apiSuccess {String} version Current version of Karma.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'name': 'Karma API',
 *       'version': '1.0.0-alpha-1'
 *     }
 */

router.get('/', function (req, res, next) {
  res.json({
    'name': 'Karma API',
    'version': '1.0.0-alpha-1'
  })
})

router.use('/public', require('./public'))

module.exports = router

var express = require('express')
var router = express.Router()

/**
 * @api {get} / Main Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGateMain
 * @apiGroup EntryGates
 *
 * @apiSuccess {String} name Karma API.
 * @apiSuccess {String} version Current version of Karma.
 *
 * @apiSuccessExample {json} Success-Response:
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
router.use('/private', require('./private'))

module.exports = router

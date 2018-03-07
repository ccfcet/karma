var express = require('express')
var router = express.Router()

/**
 * @api {get} /public Karma Entry Gate - Public
 * @apiVersion 1.0.0-alpha-1
 * @apiName KarmaEntryGatePublic
 * @apiGroup Karma
 *
 * @apiSuccess {Number} status 200
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'status': 200
 *     }
 */

router.get('/', function (req, res, next) {
  res.send({ 'status': 200 })
})

router.use('/information', require('./information'))

router.use('/menu', require('./menu'))

module.exports = router

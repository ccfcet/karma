var express = require('express')
var router = express.Router()

/**
 * @api {get} /public Public Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGatePublic
 * @apiGroup EntryGates
 *
 * @apiSuccess {Number} status 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'status': 200
 *     }
 */

router.get('/', function (req, res) {
  res.send({ 'status': 200 })
})

router.use('/information', require('./information'))

router.use('/menu', require('./menu'))

module.exports = router

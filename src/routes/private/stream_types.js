var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

/**
 * @api {get} /private Private Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGatePrivate
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

router.post('/', function (req, res) {
  var info = {}
  info.stream_type_long = req.body.stream_type
  info.stream_type_short = req.body.stream_type_short
  info.start_date = req.body.start_date
  info.end_date = req.body.end_date
  methods.Academics.addStreamTypes(info)
    .then((model) => {
      res.send(model)
    })
    .catch((err) => {
      res.send({
        'status': 'error',
        'error': err
      })
    })
})

module.exports = router

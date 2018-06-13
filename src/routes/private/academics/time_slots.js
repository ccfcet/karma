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
router.get('/', (req, res) => {
  res.send({
    'status': 'functional'
  })
})

router.post('/', function (req, res) {
  var info = {}
  info.stream_type_long = req.body.streamType
  info.stream_type_short = req.body.streamTypeShort
  info.start_date = req.body.startDate
  info.end_date = req.body.endDate
  console.log(info)
  methods.Academics.streamTypesMethods.addTimeSlots(info)
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

router.put('/:streamId', (req, res) => {
  var info = {}
  var data = {}

  info.id = req.params.streamId // key values for finding row

  if (req.body.hasOwnProperty('streamType')) {
    data.stream_type_long = req.body.streamType
  }
  if (req.body.hasOwnProperty('streamTypeShort')) {
    data.stream_type_short = req.body.streamTypeShort
  }
  if (req.body.hasOwnProperty('startDate')) {
    data.start_date = req.body.startDate
  }
  if (req.body.hasOwnProperty('endDate')) {
    data.end_date = req.body.endDate
  }

  methods.Academics.streamTypesMethods.updateTimeSlots(info, data)
    .then((model) => {
      res.status(200).json({
        'status': 'updated stream type',
        'state': model[0]
      })
    })
    .catch((err) => {
      res.send({
        'status': 'Not able to update.Row may not exist',
        'state': err
      })
    })
})

router.delete('/', (req, res) => {
  var info = {}

  info.id = req.body.streamId

  methods.Academics.streamTypesMethods.deleteTimeSlots(info)
    .then((model) => {
      res.status(200).json({
        'status': 'stream Type deleted',
        'state': model
      })
    })
    .catch((err) => {
      res.status(500).json({
        'status': 'Not able to delete.The row may not exist.',
        'state': err
      })
    })
})

module.exports = router

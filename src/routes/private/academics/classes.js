var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

router.get('/', function (req, res) {
  res.send({ 'status': 200 })
})

router.post('/', function (req, res) {
  var info = {}

  info.stream_id = req.body.streamId
  info.division = req.body.division
  info.current_class_slug = req.body.currentClass
  info.start_date = req.body.startDate
  info.end_date = req.body.endDate
  console.log(info)
  methods.Academics.classesMethods.addClasses(info)
    .then((model) => {
      res.send({
        'status': 200,
        model
      })
    })
    .catch((err) => {
      res.send({
        'status': 'error',
        'error': err
      })
    })
})

router.delete('/', (req, res) => {
  var info = {}

  info.stream_id = req.body.streamId
  info.division = req.body.division
  info.current_class_slug = req.body.currentClass

  methods.Academics.classesMethods.deleteClasses(info)
    .then((model) => {
      res.status(200).json({
        'status': 'Class deleted',
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

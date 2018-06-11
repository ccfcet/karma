var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

router.get('/', function (req, res) {
  res.send({ 'status': 200 })
})

router.post('/', function (req, res) {
  var info = {}

  info.class_id = req.body.classId
  info.day = req.body.day
  info.time_slot_id = req.body.timeSlotId
  info.course_id = req.body.courseId

  methods.Academics.classesTimeTablesMethods.addClassesTimeTables(info)
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

router.put('/:timeTableId', (req, res) => {
  var info = {}
  var data = {}

  info.id = req.params.timeTableId // key values for finding row

  if (req.body.hasOwnProperty('classId')) {
    data.class_id = req.body.classId
  }
  if (req.body.hasOwnProperty('day')) {
    data.day = req.body.day
  }
  if (req.body.hasOwnProperty('timeSlotId')) {
    data.time_slot_id = req.body.timeSlotId
  }
  if (req.body.hasOwnProperty('courseId')) {
    data.course_id = req.body.courseId
  }

  methods.Academics.classesTimeTablesMethods.updateClassesTimeTables(info, data)
    .then((model) => {
      res.status(200).json({
        'status': 'updated',
        'state': model[0]
      })
    })
    .catch((err) => {
      res.send({
        'status': 'Not able to update.Row maynot exist',
        'state': err
      })
    })
})

router.delete('/', (req, res) => {
  var info = {}
  info.id = req.body.timeTableId

  methods.Academics.classesTimeTablesMethods.deleteClassesTimeTables(info)
    .then((model) => {
      res.status(200).json({
        'status': 'Course deleted',
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

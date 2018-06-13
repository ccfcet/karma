var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

router.get('/', function (req, res) {
  res.send({ 'status': 200 })
})

router.post('/', function (req, res) {
  var info = {}

  info.official_course_id = req.body.officialCourseId
  info.department_id = req.body.departmentId
  info.name = req.body.name
  info.credits = req.body.credits
  info.valid_start_date = req.body.validStartDate
  info.valid_end_date = req.body.validEndDate
  info.duration_in_days = req.body.durationInDays

  methods.Academics.courses_offered.addCoursesOffered(info)
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

router.put('/:departmentId/:officialCourseId', (req, res) => {
  var info = {}
  var data = {}

  info.official_course_id = req.params.officialCourseId // key values for
  info.department_id = req.params.departmentId // finding row

  if (req.body.hasOwnProperty('name')) {
    data.name = req.body.name
  }
  if (req.body.hasOwnProperty('credits')) {
    data.credits = req.body.credits
  }
  if (req.body.hasOwnProperty('validStartDate')) {
    data.valid_start_date = req.body.validStartDate
  }
  if (req.body.hasOwnProperty('validEndDate')) {
    data.valid_end_date = req.body.validEndDate
  }
  if (req.body.hasOwnProperty('durationInDays')) {
    data.duration_in_days = req.body.durationInDays
  }

  methods.Academics.courses_offered.updateCourses(info, data)
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

  info.department_id = req.body.departmentId
  info.official_course_id = req.body.officialCourseId

  methods.Academics.courses_offered.deleteCourses(info)
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

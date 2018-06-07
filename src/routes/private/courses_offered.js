var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

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
      res.send({
        'status': '201 updated',
        'data': model
      })
    })
    .catch((error) => {
      res.send({
        'status': error
      })
    })
})

module.exports = router

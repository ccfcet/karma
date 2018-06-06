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

module.exports = router

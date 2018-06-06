var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

router.post('/', function (req, res) {
  var info = {}

  info.activity = req.body.activity
  info.date_time = req.body.datetime

  methods.Faculty.faculty_academic_enrolment_activity.addFacultyAcademicEnrolmentActivity(info)
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

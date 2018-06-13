var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

router.get('/', (req, res) => {
  res.send(200)
})
router.post('/', (req, res) => {
  var info = {}
  info.people_id = req.body.peopleId
  info.course_id = req.body.courseId
  info.type = req.body.type
  info.start_date_time = req.body.startDateTime
  info.end_date_time = req.body.endDateTime
  info.marks_obtained = req.body.marksObtained
  info.maximum_marks = req.body.maximumMarks
  info.status = req.body.status
  methods.students.CourseInternalAssessment.createInternalAssessment(info).then((result) => {
    res.json({
      'Status': 'Success',
      'State': result
    })
  }).catch((err) => {
    res.json({
      'Status': 'Failure',
      'State': err
    })
  })
})
router.put('/:people_id/:course_id', (req, res) => {
  var data = {}
  var info = {}
  data.people_id = req.params.people_id
  data.course_id = req.params.course_id
  if (req.body.hasOwnProperty('type')) { info.type = req.body.type }
  if (req.body.hasOwnProperty('startDateTime')) { info.start_date_time = req.body.startDateTime }
  if (req.body.hasOwnProperty('endDateTime')) { info.end_date_time = req.body.endDateTime }
  if (req.body.hasOwnProperty('marksObtained')) { info.marks_obtained = req.body.marksObtained }
  if (req.body.hasOwnProperty('maximumMarks')) { info.maximum_marks = req.body.maximumMarks }
  if (req.body.hasOwnProperty('status')) {
    info.status = req.body.status
  }
  methods.students.CourseInternalAssessment.updateInternalAssessment(info, data).then((result) => {
    res.json({
      'Status': 'Success',
      'State': result
    })
  }).catch((err) => {
    res.json({
      'Status': 'Failure',
      'State': err
    })
  })
})

router.delete('/', (req, res) => {
  var info = {}
  info.people_id = req.body.peopleId
  info.course_id = req.body.courseId

  methods.students.CourseInternalAssessment.deleteInternalAssessment(info)
    .then((result) => {
      res.json({
        'Status': 'Success',
        'State': result
      })
    }).catch((err) => {
      res.json({
        'Status': 'Failure',
        'State': err
      })
    })
})
module.exports = router

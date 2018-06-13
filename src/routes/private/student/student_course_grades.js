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
  info.status = req.body.status
  info.grading_standard_id = req.body.gradingStandardId
  info.grade = req.body.grade
  methods.students.CourseGrades.addStudentGrade(info)
    .then((created) => {
      res.json({
        'status': 'created',
        'state': created
      })
    }).catch((err) => {
      res.json({
        'status': 'Error',
        'state': err
      })
    })
})

router.put('/:peopleId/:courseId', (req, res) => {
  var info = {}
  var data = {}
  // console.log(req.params.peopleId)
  info.people_id = req.params.peopleId
  info.course_id = req.params.courseId
  if (req.body.hasOwnProperty('status')) {
    data.status = req.body.status
  }
  if (req.body.hasOwnProperty('gradingStandardId')) {
    data.grading_standard_id = req.body.gradingStandardId
  }
  if (req.body.hasOwnProperty('grade')) {
    data.grade = req.body.grade
  }
  // console.log(req.params.peopleId)

  methods.students.CourseGrades.updateStudentGrade(info, data)
    .then((updated) => {
      console.log(req.params.peopleId)

      res.json({
        'status': 'Updated',
        'state': updated
      })
    }).catch((err) => {
      res.json({
        'status': 'Error',
        'state': err
      })
    })
})

router.delete('/', (req, res) => {
  var info = {}
  info.people_id = req.body.peopleId
  info.course_id = req.body.courseId
  methods.students.CourseGrades.deleteStudentGrade(info)
    .then((deleted) => {
      res.json({
        'Status': 'Deleted',
        'State': deleted
      })
    }).catch((err) => {
      res.json({
        'Status': 'Error',
        'State': err
      })
    })
})

module.exports = router

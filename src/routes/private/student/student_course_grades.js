const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  res.send(200);
});

router.post('/', (req, res) => {
  const info = {};
  info.people_id = req.body.peopleId;
  info.course_id = req.body.courseId;
  info.status = req.body.status;
  info.grading_standard_id = req.body.gradingStandardId;
  info.grade = req.body.grade;
  methods.students.CourseGrades.addStudentGrade(info)
    .then((created) => {
      res.json({
        status: 'created',
        state: created,
      });
    }).catch((err) => {
      res.json({
        status: 'Error',
        state: err,
      });
    });
});

router.put('/:peopleId/:courseId', (req, res) => {
  const info = {};
  const data = {};
  // console.log(req.params.peopleId)
  info.people_id = req.params.peopleId;
  info.course_id = req.params.courseId;
  if (Object.prototype.hasOwnProperty.call(req.body, 'status') && Object
    .prototype.hasOwnProperty.call(req.body, 'gradingStandardId') && Object
    .prototype.hasOwnProperty.call(req.body, 'grade')) {
    data.status = req.body.status;
    data.grading_standard_id = req.body.gradingStandardId;
    data.grade = req.body.grade;
  }

  methods.students.CourseGrades.updateStudentGrade(info, data)
    .then((updated) => {
      // console.log(req.params.peopleId);

      res.json({
        status: 'Updated',
        state: updated,
      });
    }).catch((err) => {
      res.json({
        status: 'Error',
        state: err,
      });
    });
});

router.delete('/', (req, res) => {
  const info = {};
  info.people_id = req.body.peopleId;
  info.course_id = req.body.courseId;
  methods.students.CourseGrades.deleteStudentGrade(info)
    .then((deleted) => {
      res.json({
        Status: 'Deleted',
        State: deleted,
      });
    }).catch((err) => {
      res.json({
        Status: 'Error',
        State: err,
      });
    });
});

module.exports = router;

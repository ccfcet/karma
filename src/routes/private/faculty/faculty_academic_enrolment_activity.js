const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  methods.Faculty.facultyEAMethods.getAllFacultyAcademicEnrolmentActivity()
    .then((classes) => {
      console.log('people');
      res.json({
        status: 'success',
        classes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});

router.post('/', (req, res) => {
  const info = {};
  info.people_id = req.body.peopleId;
  info.course_id = req.body.courseId;
  info.activity = req.body.activity;
  info.date_time = req.body.datetime;

  methods.Faculty
    .facultyEAMethods
    .addFacultyAcademicEnrolmentActivity(info)
    .then((model) => {
      res.send(model);
    })
    .catch((err) => {
      res.send({
        status: 'error',
        error: err,
      });
    });
});
router.put('/:enrolmentId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.EnrolmentId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'peopleId') 
   && Object.prototype.hasOwnProperty.call(req.body, 'courseId') 
   && Object.prototype.hasOwnProperty.call(req.body, 'activity') 
   && Object.prototype.hasOwnProperty.call(req.body, 'datetime')) {
    data.people_id = req.body.peopleId;
    data.course_id = req.body.courseId;
    data.activity = req.body.activity;
    data.date_time = req.body.datetime;
  }

  methods.Faculty
    .facultyEAMethods
    .updateFacultyAcademicEnrolmentActivity(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated',
        state: model[0],
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row maynot exist',
        state: err,
      });
    });
});

router.delete('/', (req, res) => {
  const info = {};

  info.people_id = req.body.peopleId;
  info.course_id = req.body.courseId;
  info.activity = req.body.activity;


  methods.Faculty
    .facultyEAMethods
    .deleteFacultyAcademicEnrolmentActivity(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted faculty_enrolment_activity',
        state: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'Not able to delete.The row may not exist.',
        state: err,
      });
    });
});
module.exports = router;

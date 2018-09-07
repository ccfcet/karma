const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  console.log('inside faculty activity');
  methods.Faculty.facultyClassAdvisoryMethods
    .getAllFacultyClassAdvisoryActivity()
    .then((classes) => {
      console.log('got activity');
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
  info.class_id = req.body.classId;
  info.activity = req.body.activity;
  info.date_time = req.body.datetime;

  methods.Faculty
    .facultyClassAdvisoryMethods
    .addFacultyClassAdvisoryActivity(info)
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
router.put('/:advisoryId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.advisoryId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'peopleId')
   && Object.prototype.hasOwnProperty.call(req.body, 'classId')
   && Object.prototype.hasOwnProperty.call(req.body, 'activity')
   && Object.prototype.hasOwnProperty.call(req.body, 'dateTime')
   && Object.prototype.hasOwnProperty.call(req.body, 'courseId')) {
    data.people_id = req.body.peopleId;
    data.class_id = req.body.classId;
    data.activity = req.body.activity;
    data.date_time = req.body.dateTime;
    data.course_id = req.body.courseId;
  }

  methods.Faculty
    .facultyClassAdvisoryMethods
    .updateFacultyClassAdvisoryActivity(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated faculty_activity',
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

  info.people_id = req.body.data.peopleId;
  info.class_id = req.body.data.classId;
  info.activity = req.body.data.activity;


  methods.Faculty
    .facultyClassAdvisoryMethods
    .deleteFacultyClassAdvisoryActivity(info)
    .then((model) => {
      res.status(200).json({
        status: 'faculty_advisory deleted',
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

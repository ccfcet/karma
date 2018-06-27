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
  info.date_time = req.body.dateTime;
  info.activity = req.body.activity;
  methods.students.ClassEnrollmentActivity.createActivity(info)
    .then((created) => {
      res.json({
        Status: 'Sucess',
        State: created[0],
      });
    }).catch((err) => {
      res.json({
        Status: 'Failure',
        State: err[0],
      });
    });
});

router.put('/:people_id/:course_id', (req, res) => {
  const data = {};

  data.people_id = req.params.people_id;
  data.course_id = req.params.course_id;

  const info = {};

  if (Object.prototype.hasOwnProperty.call(req.body, 'dateTime') && Object
    .prototype.hasOwnProperty.call(req.body, 'activity')) {
    info.date_time = req.body.dateTime;
    info.activity = req.body.activity;
  }
  methods.students.ClassEnrollmentActivity.updateActivity(info, data)
    .then((updated) => {
      res.json({
        Status: 'Success',
        State: updated[0],
      });
    }).catch((err) => {
      res.json({
        Status: 'Failure',
        State: err[0],
      });
    });
});

router.delete('/', (req, res) => {
  const info = {};
  info.people_id = req.body.peopleId;
  info.course_id = req.body.courseId;
  methods.students.ClassEnrollmentActivity.deleteActivity(info)
    .then((deleted) => {
      res.json({
        Status: 'Success',
        State: deleted[0],
      });
    }).catch((err) => {
      res.json({
        Status: 'Failure',
        State: err[0],
      });
    });
});
module.exports = router;

const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  res.send(200);
});

router.get('/:people_id', (req, res) => {
  data = {};
  data.people_id = req.params.people_id;
  methods.students.CourseInternalAssessment.getInternalAssessment(data)
    .then((result) => {
      res.json({
        status: 'success',
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: 'failure',
        error: err,
      });
    });
});

router.post('/', (req, res) => {
  const info = {};
  info.people_id = req.body.peopleId;
  info.course_id = req.body.courseId;
  info.type = req.body.type;
  info.start_date_time = req.body.startDateTime;
  info.end_date_time = req.body.endDateTime;
  info.marks_obtained = req.body.marksObtained;
  info.maximum_marks = req.body.maximumMarks;
  info.status = req.body.status;
  methods.students.CourseInternalAssessment.createInternalAssessment(info)
    .then((result) => {
      res.json({
        Status: 'Success',
        State: result,
      });
    }).catch((err) => {
      res.json({
        Status: 'Failure',
        State: err,
      });
    });
});

router.put('/:people_id/:course_id', (req, res) => {
  const data = {};

  data.people_id = req.params.people_id;
  data.course_id = req.params.course_id;

  const info = {};

  if (Object.prototype.hasOwnProperty.call(req.body, 'type') && Object.prototype
    .hasOwnProperty.call(req.body, 'startDateTime') && Object.prototype
    .hasOwnProperty.call(req.body, 'endDateTime') && Object.prototype
    .hasOwnProperty.call(req.body, 'marksObtained') && Object.prototype
    .hasOwnProperty.call(req.body, 'maximumMarks') && Object.prototype
    .hasOwnProperty.call(req.body, 'status')) {
    info.type = req.body.type;
    info.start_date_time = req.body.startDateTime;
    info.end_date_time = req.body.endDateTime;
    info.marks_obtained = req.body.marksObtained;
    info.maximum_marks = req.body.maximumMarks;
    info.status = req.body.status;
  }

  methods.students.CourseInternalAssessment.updateInternalAssessment(info, data)
    .then((result) => {
      res.json({
        Status: 'Success',
        State: result,
      });
    }).catch((err) => {
      res.json({
        Status: 'Failure',
        State: err,
      });
    });
});

router.delete('/', (req, res) => {
  const info = {};
  info.people_id = req.body.peopleId;
  info.course_id = req.body.courseId;

  methods.students.CourseInternalAssessment.deleteInternalAssessment(info)
    .then((result) => {
      res.json({
        Status: 'Success',
        State: result,
      });
    }).catch((err) => {
      res.json({
        Status: 'Failure',
        State: err,
      });
    });
});

module.exports = router;

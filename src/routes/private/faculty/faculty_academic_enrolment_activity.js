const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.post('/', (req, res) => {
  const info = {};

  info.activity = req.body.activity;
  info.date_time = req.body.datetime;

  methods.Faculty.faculty_academic_enrolment_activity
    .addFacultyAcademicEnrolmentActivity(info)
    .then((model) => {
      res.json(model);
    })
    .catch((err) => {
      res.json({
        status: 'error',
        error: err,
      });
    });
});

module.exports = router;

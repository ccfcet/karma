const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ status: 200 });
  console.log('entered faculty index');
});

router.use('/faculty_academic_enrolment_activity',
  require('./faculty_academic_enrolment_activity'));
router.use('/faculty_class_advisory_activity',
  require('./faculty_class_advisory_activity'));

module.exports = router;

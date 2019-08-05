const express = require('express');

const router = express.Router();

router.use('/student_course_grades', require('./student_course_grades'));
router.use('/student_course_grading_standards',
  require('./student_course_grading_standards'));
router.use('/student_course_internal_assessment',
  require('./student_course_internal_assessment'));
router.use('/student_class_enrollment_activity',
  require('./student_class_enrollment_activity'));
router.use('/student_attendance_data',
  require('./student_attendance_data'));

module.exports = router;

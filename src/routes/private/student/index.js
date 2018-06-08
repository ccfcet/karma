var express = require('express')
var router = express.Router()

router.use('/student_course_grades', require('./student_course_grades'))
router.use('/student_course_grading_standards', require('./student_course_grading_standards'))
module.exports = router

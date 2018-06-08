var express = require('express')
var router = express.Router()

router.use('/student_course_grades', require('./student_course_grades'))

module.exports = router

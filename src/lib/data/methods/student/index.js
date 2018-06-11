var studentMethods = {}

studentMethods.CourseGrades = require('./student_course_grades')
studentMethods.CourseGradingStandard = require('./student_course_grading_standards')
studentMethods.CourseInternalAssessment = require('./student_course_internal_assessment')
studentMethods.ClassEnrollmentActivity = require('./student_class_enrollment_activity')
module.exports = studentMethods

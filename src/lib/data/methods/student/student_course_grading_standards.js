var Promise = require('bluebird')
var models = require('_/data/models')

var studentCourseGradingStandards = {}

studentCourseGradingStandards.createStandard = (info) => {
  return new Promise((resolve, reject) => {
    models.Student.student_course_grading_standards.create(info)
      .then((created) => {
        resolve(created)
      }).catch((err) => {
        reject(err)
      })
  })
}
module.exports = studentCourseGradingStandards

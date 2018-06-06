var Promise = require('bluebird')

var models = require('_/data/models')
var coursesOfferedMethods = {}
coursesOfferedMethods.addCoursesOffered = (info) => {
  return new Promise((resolve, reject) => {
    models.Academics.courses_offered.create(info)
      .then((newCourseOffered) => {
        resolve(newCourseOffered)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = coursesOfferedMethods

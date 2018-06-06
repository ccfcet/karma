var Promise = require('bluebird')

var models = require('_/data/models')
var coursesOfferedMethods = {}
coursesOfferedMethods.addCoursesOffered = (info) => {
  console.log('inside adding offered courses')

  return new Promise((resolve, reject) => {
    models.Academics.courses_offered.create(info)

    resolve(model)
  })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
}

module.exports = coursesOfferedMethods

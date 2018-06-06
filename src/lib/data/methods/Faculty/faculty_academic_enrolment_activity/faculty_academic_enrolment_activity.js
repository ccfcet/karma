var Promise = require('bluebird')

var models = require('_/data/models')
var facultyMethods = {}
facultyMethods.addFacultyAcademicEnrolmentActivity = (info) => {
  console.log('inside adding faculty enrolment')

  // return new Promise((resolve, reject) => {
  //   models.Faculty.faculty_academic_enrolment_activity.create(info)

  //   resolve(model)
  // })
  //   .catch((err) => {
  //     console.log(err)
  //     reject(err)
  //   })
  return new Promise((resolve, reject) => {
    models.Faculty.faculty_academic_enrolment_activity.create(info)
      .then((newfacultyAcademicEnrolemntActivity) => {
        resolve(newfacultyAcademicEnrolemntActivity)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = facultyMethods

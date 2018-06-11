var Promise = require('bluebird')
var models = require('_/data/models')

var internalAssessmentMethods = {}
internalAssessmentMethods.createInternalAssessment = (info) => {
  return new Promise((resolve, reject) => {
    models.Student.student_course_internal_assessment.create(info)
      .then((created) => {
        resolve(created)
      }).catch((err) => {
        reject(err)
      })
  })
}

internalAssessmentMethods.updateInternalAssessment = (info, data) => {
  return new Promise((resolve, reject) => {
    models.Student.student_course_internal_assessment.update(info, {
      where: {
        people_id: data.people_id,
        course_id: data.course_id
      }
    }).then((updated) => {
      if (updated > 0) {
        resolve(updated)
      } else {
        reject(new Error())
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

internalAssessmentMethods.deleteInternalAssessment = (info) => {
  return new Promise((resolve, reject) => {
    models.Student.student_course_internal_assessment.destroy({where: info
    }).then((deleted) => {
      if (deleted > 0) {
        resolve(deleted)
      } else {
        reject(new Error('The Value May not be present in the database'))
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports = internalAssessmentMethods

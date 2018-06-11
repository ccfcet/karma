var Promise = require('bluebird')
var models = require('_/data/models')
var classEnrollmentActivity = {}

classEnrollmentActivity.createActivity = (info) => {
  return new Promise((resolve, reject) => {
    models.Student.student_course_enrolment_activity.create(info).then((created) => {
      resolve(created)
    }).catch((err) => {
      reject(err)
    })
  })
}

classEnrollmentActivity.updateActivity = (info, data) => {
  return new Promise((resolve, reject) => {
    models.Student.student_course_enrolment_activity.update(info, {
      where: {
        people_id: data.people_id,
        course_id: data.course_id
      }
    }).then((updated) => {
      if (updated > 0) {
        resolve(updated)
      } else {
        reject(updated)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

classEnrollmentActivity.deleteActivity = (info) => {
  return new Promise((resolve, reject) => {
    models.Student.student_course_enrolment_activity.destroy({
      where: info
    }).then((deleted) => {
      if (deleted > 0) { resolve(deleted) } else { reject(deleted) }
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports = classEnrollmentActivity

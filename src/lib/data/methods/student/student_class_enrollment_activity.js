const Promise = require('bluebird');
const models = require('../../models');

const classEnrollmentActivity = {};

classEnrollmentActivity
  .createActivity = info => new Promise((resolve, reject) => {
    models.student.student_course_enrolment_activity.create(info)
      .then((created) => {
        resolve(created);
      }).catch((err) => {
        reject(err);
      });
  });

classEnrollmentActivity
  .updateActivity = (info, data) => new Promise((resolve, reject) => {
    models.student.student_course_enrolment_activity.update(info, {
      where: {
        people_id: data.people_id,
        course_id: data.course_id,
      },
    }).then((updated) => {
      if (updated > 0) {
        resolve(updated);
      } else {
        reject(updated);
      }
    }).catch((err) => {
      reject(err);
    });
  });

classEnrollmentActivity
  .deleteActivity = info => new Promise((resolve, reject) => {
    models.student.student_course_enrolment_activity.destroy({
      where: info,
    }).then((deleted) => {
      if (deleted > 0) {
        resolve(deleted);
      } else {
        reject(deleted);
      }
    }).catch((err) => {
      reject(err);
    });
  });

module.exports = classEnrollmentActivity;

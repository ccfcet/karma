const Promise = require('bluebird');
const models = require('../../models');

const studentCourseGradesMethods = {};

studentCourseGradesMethods
  .addStudentGrade = info => new Promise((resolve, reject) => {
    models.student.student_course_grades.create(info)
      .then((created) => {
        resolve(created);
      }).catch((err) => {
        reject(err);
      });
  });

studentCourseGradesMethods
  .updateStudentGrade = (info, data) => new Promise((resolve, reject) => {
    console.log('Hello');
    console.log(info.people_id);
    models.student.student_course_grades.update(data, {
      where: {
        people_id: info.people_id,
        course_id: info.course_id,
      },
    }).then((updated) => {
      if (updated === 0) {
        reject(new Error());
      } else {
        resolve(updated);
      }
    }).catch((err) => {
      reject(err);
    });
  });

studentCourseGradesMethods
  .deleteStudentGrade = info => new Promise((resolve, reject) => {
    models.student.student_course_grades.destroy({
      where: {
        people_id: info.people_id,
        course_id: info.course_id,
      },
    }).then((deleted) => {
      if (deleted === 0) {
        reject(new Error());
      } else {
        resolve(deleted);
      }
    }).catch((err) => {
      reject(err);
    });
  });
module.exports = studentCourseGradesMethods;

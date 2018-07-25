const Promise = require('bluebird');
const models = require('../../models');

const studentCourseGradingStandards = {};

studentCourseGradingStandards
  .createStandard = info => new Promise((resolve, reject) => {
    models.student.student_course_grading_standards.create(info)
      .then((created) => {
        resolve(created);
      }).catch((err) => {
        reject(err);
      });
  });

module.exports = studentCourseGradingStandards;

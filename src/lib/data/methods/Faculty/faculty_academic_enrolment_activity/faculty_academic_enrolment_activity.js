const Promise = require('bluebird');

const models = require('../../../models');

const facultyMethods = {};
facultyMethods.addFacultyAcademicEnrolmentActivity = (info) => {
  console.log('inside adding faculty enrolment');
  return new Promise((resolve, reject) => {
    models.Faculty.faculty_academic_enrolment_activity.create(info)
      .then((newfacultyAcademicEnrolemntActivity) => {
        resolve(newfacultyAcademicEnrolemntActivity);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = facultyMethods;

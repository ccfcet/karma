const Promise = require('bluebird');
const models = require('../../models');

const facultyEAMethods = {};
facultyEAMethods.addFacultyAcademicEnrolmentActivity = (info) => {
  console.log('inside adding faculty enrolment');
  return new Promise((resolve, reject) => {
    models.faculty.faculty_academic_enrolment_activity.create(info)
      .then((newfacultyAcademicEnrolemntActivity) => {
        resolve(newfacultyAcademicEnrolemntActivity);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

facultyEAMethods.getAllFacultyAcademicEnrolmentActivity = () => new Promise((
  resolve, reject,
) => {
  models.faculty.faculty_academic_enrolment_activity.findAll()
    .then((people) => {
      resolve(people);
    })
    .catch((err) => {
      reject(err);
    });
});

facultyEAMethods
  .updateFacultyAcademicEnrolmentActivity = (info, data) => {
    console.log(info, data);
    return new Promise((resolve, reject) => {
      models.faculty.faculty_academic_enrolment_activity.update(data, {
        where: {
          id: info.id,
        },
      })
        .then((updated) => {
          if (updated > 0) {
            resolve(updated);
          } else {
            reject(new Error());
          // throw ('err')
          }
        }).catch((error) => {
          reject(error);
        });
    });
  };

facultyEAMethods.deleteAllFacultyAcademicEnrolmentActivity = () => new Promise((
  resolve,
  reject,
) => {
  models.faculty.faculty_academic_enrolment_activity.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

facultyEAMethods.deleteFacultyAcademicEnrolmentActivity = info => new Promise((
  resolve,
  reject,
) => {
  models.faculty.faculty_academic_enrolment_activity.destroy({
    where: {
      people_id: info.people_id,
      course_id: info.course_id,
      activity: info.activity,

    },
  }).then((deleted) => {
    if (deleted === 0) {
      console.log('error tg');
      reject(new Error());
    } else {
      resolve(deleted);
    }
  }).catch((err) => {
    reject(err);
  });
});


module.exports = facultyEAMethods;

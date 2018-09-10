const Promise = require('bluebird');

const models = require('../../models');

const facultyClassAdvisoryMethods = {};
facultyClassAdvisoryMethods.addFacultyClassAdvisoryActivity = (info) => {
  console.log('inside adding faculty enrolment');
  return new Promise((resolve, reject) => {
    models.faculty.faculty_class_advisory_activity.create(info)
      .then((newfacultyClassAdvisoryActivity) => {
        resolve(newfacultyClassAdvisoryActivity);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
facultyClassAdvisoryMethods
  .getAllFacultyClassAdvisoryActivity = () => new Promise((resolve, reject) => {
    models.faculty.faculty_class_advisory_activity.findAll()
      .then((people) => {
        resolve(people);
      })
      .catch((err) => {
        reject(err);
      });
  });


facultyClassAdvisoryMethods
  .updateFacultyClassAdvisoryActivity = (info, data) => new Promise((
    resolve, reject,
  ) => {
    models.faculty.faculty_class_advisory_activity.update(data, {
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

facultyClassAdvisoryMethods
  .deleteFacultyClassAdvisoryActivity = info => new Promise((
    resolve,
    reject,
  ) => {
    models.faculty.faculty_class_advisory_activity.destroy({
      where: {
        people_id: info.people_id,
        class_id: info.class_id,
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

facultyClassAdvisoryMethods
  .deleteAllFacultyClassAdvisoryActivity = () => new Promise((
    resolve,
    reject,
  ) => {
    models.faculty.faculty_class_advisory_activity.destroy({
      where: {},
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
module.exports = facultyClassAdvisoryMethods;

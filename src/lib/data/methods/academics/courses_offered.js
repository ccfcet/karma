const Promise = require('bluebird');

const models = require('../../models');

const coursesOfferedMethods = {};

coursesOfferedMethods.getAllCoursesOffered = () => new Promise((resolve,
  reject) => {
  models.academics.courses_offered.findAll()
    .then((newCourseOffered) => {
      resolve(newCourseOffered);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

coursesOfferedMethods.getCourseData = data => new Promise((
  resolve, reject,
) => {
  course_id = data.course_id;
  console.log('getCourseData');
  models.academics.courses_offered.find({
    where: {
      id: course_id,
    },
  }).then((course) => {
    console.log(course);
    resolve(course);
  })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

coursesOfferedMethods.addCoursesOffered = info => new Promise((
  resolve, reject,
) => {
  models.academics.courses_offered.create(info)
    .then((model) => {
      resolve(model);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

coursesOfferedMethods.updateCoursesOffered = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.academics.courses_offered.update(data, {
    where: {
      id: info.id,
    },
  })
    .then((updated) => {
      if (updated > 0) {
        resolve(updated);
      } else {
        reject(new Error());
      }
    }).catch((error) => {
      reject(error);
    });
});

coursesOfferedMethods.deleteAllCoursesOffered = () => new Promise((
  resolve,
  reject,
) => {
  models.academics.courses_offered.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

coursesOfferedMethods.deleteCoursesOffered = info => new Promise((
  resolve, reject,
) => {
  models.academics.courses_offered.destroy({
    where: {
      department_id: info.department_id,
      official_course_id: info.official_course_id,
    },
  }).then((deleted) => {
    if (deleted === 0) {
      console.log('error');
      reject(new Error());
    } else {
      resolve(deleted);
    }
  }).catch((err) => {
    reject(err);
  });
});

module.exports = coursesOfferedMethods;

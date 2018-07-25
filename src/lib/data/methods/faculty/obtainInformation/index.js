const Promise = require('bluebird');

const models = require('../../../models');

const obtainInformation = function () {
  return new Promise(((resolve, reject) => {
    models.faculty.faculty_academic_enrolment_activity.findAll({
      include: [
        {
          model: models.People.people,
          // where: { id: id }
        },
      ],
      attributes: ['data'],
      rejectOnEmpty: true,
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  }));
};

module.exports = obtainInformation;
